import * as React from 'react';

export interface ReactMonacoEditorProps {
  width?: string | number;
  height?: string | number;
  value?: string;
  defaultValue?: string;
  language?: string;
  theme?: string;
  options?: monaco.editor.IEditorOptions;
  editorDidMount?: (monacoModule: typeof monaco, editor?: monaco.editor.ICodeEditor, ) => void;
  editorWillMount?: (monacoModule: typeof monaco) => void;
  onChange?: (val: string, ev: monaco.editor.IModelContentChangedEvent) => void;
  requireConfig?: { url?: string, paths?: { vs?: string } };
  context?: any;
}

interface ReactMonacoEditorState {
  containerElement?: HTMLDivElement;
  currentValue?: string;
  editor?: monaco.editor.ICodeEditor;
  preventTriggerChangeEvent?: boolean;
}

export default class MonacoEditor extends React.Component<ReactMonacoEditorProps, ReactMonacoEditorState> {
  constructor(props: ReactMonacoEditorProps) {
    super(props);
    this.setState({ containerElement: undefined });
    this.setState({ currentValue: props.value });
  }

  componentDidMount() {
    this.afterViewInit();
  }

  componentDidUpdate(prevProps: ReactMonacoEditorProps) {
    const context = this.props.context || window;
    if (this.props.value !== this.state.currentValue) {
      // Always refer to the latest value
      this.setState({ currentValue: this.props.value });
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.state.editor) {
        this.setState({ preventTriggerChangeEvent: true });
        this.state.editor.setValue(this.state.currentValue ? this.state.currentValue : '');
        this.setState({ preventTriggerChangeEvent: false });
      }
    }
    if (prevProps.language !== this.props.language && this.state.editor !== undefined) {
      context.monaco.editor.setModelLanguage(this.state.editor.getModel(), this.props.language);
    }
  }

  componentWillUnmount() {
    this.destroyMonaco();
  }

  editorWillMount(mon: typeof monaco) {
    const { editorWillMount } = this.props;
    if (editorWillMount !== undefined) {
      editorWillMount(mon);
    }
  }

  editorDidMount(mon: typeof monaco, editor?: monaco.editor.ICodeEditor) {
    if (this.props.editorDidMount !== undefined) {
      this.props.editorDidMount(monaco, editor);
    }
    if (editor !== undefined) {
      editor.onDidChangeModelContent((event) => {
        const value = editor.getValue();

        // Always refer to the latest value
        this.setState({ currentValue: value });

        // Only invoking when user input changed
        if (!this.state.preventTriggerChangeEvent) {
          if (this.props.onChange !== undefined) {
            this.props.onChange(value, event);
          }
        }
      });
    }
  }

  afterViewInit() {
    const context = this.props.context || window;
    if (context.monaco !== undefined) {
      this.initMonaco();
      return;
    }
    const { requireConfig = {} } = this.props;
    const inElectron = context.process && context.process.type === 'renderer';
    const loaderUrl = requireConfig !== undefined && requireConfig.url !== undefined ?
      requireConfig.url : 'vs/loader.js';

    if (inElectron) {
      // Running in electron, need to deal with the difference between node require and AMDRequire
      // Save a reference to node's require to set back up later
      context.electronNodeRequire = context.require;
    }

    const onGotAmdLoader = () => {
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        // Do not use webpack
        if (inElectron) {
          // Have just loaded loader.js and now context.require is not node's require
          const path = context.electronNodeRequire('path');

          // TODO: Check this works cross-platform. Probably won't?
          function uriFromPath(_path: string) {
            let pathName = path.resolve(_path).replace(/\\/g, '/');
            if (pathName.length > 0 && pathName.charAt(0) !== '/') {
              pathName = `/${pathName}`;
            }
            return encodeURI(`file://${pathName}`);
          }

          const monacoPath = path.join(context.__dirname, 'dist/monaco-editor/min');

          const amdRequireBaseUrl = uriFromPath(monacoPath);

          context.require.config({
            baseUrl: amdRequireBaseUrl,
          });

          context.window.module = undefined;
          // workaround monaco-typescript not understanding the environment
          context.window.process.browser = true;
        }

        if (requireConfig.paths && requireConfig.paths.vs) {
          context.require.config(requireConfig);
        }
      }

      // Load monaco
      context.require(['vs/editor/editor.main'], () => {
        this.initMonaco();
      });

      // Call the delayed callbacks when AMD loader has been loaded
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
        const loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
        if (loaderCallbacks && loaderCallbacks.length) {
          let currentCallback = loaderCallbacks.shift();
          while (currentCallback) {
            currentCallback.fn.call(currentCallback.context);
            currentCallback = loaderCallbacks.shift();
          }
        }
      }
    };

    // Load AMD loader if necessary
    if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
      // We need to avoid loading multiple loader.js when there are multiple editors loading
      // concurrently, delay to call callbacks except the first one
      context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
      context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
        context: this,
        fn: onGotAmdLoader,
      });
    } else if (typeof context.require === 'undefined' || inElectron) {
      const loaderScript = context.document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = loaderUrl;
      loaderScript.addEventListener('load', onGotAmdLoader);
      context.document.body.appendChild(loaderScript);
      context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
    } else {
      onGotAmdLoader();
    }
  }

  initMonaco() {
    const value = this.props.value !== null ? this.props.value : this.props.defaultValue;
    const { language = 'javascript', theme = undefined, options = {} } = this.props;
    const context = this.props.context || window;
    if (this.state.containerElement && typeof context.monaco !== 'undefined') {
      // Before initializing monaco editor
      this.editorWillMount(context.monaco);
      this.setState({
        editor: context.monaco.editor.create(this.state.containerElement, {
          value,
          language,
          ...options,
        }),
      });
      if (theme) {
        context.monaco.editor.setTheme(theme);
      }
      // After initializing monaco editor
      this.editorDidMount(context.monaco, this.state.editor, );
    }
  }

  destroyMonaco() {
    if (typeof this.state.editor !== 'undefined') {
      this.state.editor.dispose();
    }
  }

  assignRef = (component: HTMLDivElement) => {
    this.setState({ containerElement: component });
  }

  render() {
    const { width = '100%', height = '100%' } = this.props;
    console.log('rendering'); // tslint:disable-line
    if (this.state != null && this.state.editor !== undefined) {
      console.log(this.state.editor.layout); // tslint:disable-line
      this.state.editor.layout();
    }

    const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`;
    const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`;
    const style = {
      width: fixedWidth,
      height: fixedHeight,
    };

    return <div ref={this.assignRef} style={style} className='react-monaco-editor-container' />;
  }
}
