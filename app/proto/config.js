/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.polyglot = (function() {

    /**
     * Namespace polyglot.
     * @exports polyglot
     * @namespace
     */
    var polyglot = {};

    polyglot.ConfigurationSet = (function() {

        /**
         * Properties of a ConfigurationSet.
         * @memberof polyglot
         * @interface IConfigurationSet
         * @property {Array.<polyglot.IConfiguration>} [configurations] ConfigurationSet configurations
         */

        /**
         * Constructs a new ConfigurationSet.
         * @memberof polyglot
         * @classdesc Represents a ConfigurationSet.
         * @constructor
         * @param {polyglot.IConfigurationSet=} [properties] Properties to set
         */
        function ConfigurationSet(properties) {
            this.configurations = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConfigurationSet configurations.
         * @member {Array.<polyglot.IConfiguration>}configurations
         * @memberof polyglot.ConfigurationSet
         * @instance
         */
        ConfigurationSet.prototype.configurations = $util.emptyArray;

        /**
         * Creates a new ConfigurationSet instance using the specified properties.
         * @function create
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {polyglot.IConfigurationSet=} [properties] Properties to set
         * @returns {polyglot.ConfigurationSet} ConfigurationSet instance
         */
        ConfigurationSet.create = function create(properties) {
            return new ConfigurationSet(properties);
        };

        /**
         * Encodes the specified ConfigurationSet message. Does not implicitly {@link polyglot.ConfigurationSet.verify|verify} messages.
         * @function encode
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {polyglot.IConfigurationSet} message ConfigurationSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationSet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.configurations != null && message.configurations.length)
                for (var i = 0; i < message.configurations.length; ++i)
                    $root.polyglot.Configuration.encode(message.configurations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ConfigurationSet message, length delimited. Does not implicitly {@link polyglot.ConfigurationSet.verify|verify} messages.
         * @function encodeDelimited
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {polyglot.IConfigurationSet} message ConfigurationSet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationSet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ConfigurationSet message from the specified reader or buffer.
         * @function decode
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {polyglot.ConfigurationSet} ConfigurationSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationSet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.ConfigurationSet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.configurations && message.configurations.length))
                        message.configurations = [];
                    message.configurations.push($root.polyglot.Configuration.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ConfigurationSet message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {polyglot.ConfigurationSet} ConfigurationSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationSet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConfigurationSet message.
         * @function verify
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConfigurationSet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.configurations != null && message.hasOwnProperty("configurations")) {
                if (!Array.isArray(message.configurations))
                    return "configurations: array expected";
                for (var i = 0; i < message.configurations.length; ++i) {
                    var error = $root.polyglot.Configuration.verify(message.configurations[i]);
                    if (error)
                        return "configurations." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ConfigurationSet message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {polyglot.ConfigurationSet} ConfigurationSet
         */
        ConfigurationSet.fromObject = function fromObject(object) {
            if (object instanceof $root.polyglot.ConfigurationSet)
                return object;
            var message = new $root.polyglot.ConfigurationSet();
            if (object.configurations) {
                if (!Array.isArray(object.configurations))
                    throw TypeError(".polyglot.ConfigurationSet.configurations: array expected");
                message.configurations = [];
                for (var i = 0; i < object.configurations.length; ++i) {
                    if (typeof object.configurations[i] !== "object")
                        throw TypeError(".polyglot.ConfigurationSet.configurations: object expected");
                    message.configurations[i] = $root.polyglot.Configuration.fromObject(object.configurations[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ConfigurationSet message. Also converts values to other types if specified.
         * @function toObject
         * @memberof polyglot.ConfigurationSet
         * @static
         * @param {polyglot.ConfigurationSet} message ConfigurationSet
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConfigurationSet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.configurations = [];
            if (message.configurations && message.configurations.length) {
                object.configurations = [];
                for (var j = 0; j < message.configurations.length; ++j)
                    object.configurations[j] = $root.polyglot.Configuration.toObject(message.configurations[j], options);
            }
            return object;
        };

        /**
         * Converts this ConfigurationSet to JSON.
         * @function toJSON
         * @memberof polyglot.ConfigurationSet
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConfigurationSet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ConfigurationSet;
    })();

    polyglot.Configuration = (function() {

        /**
         * Properties of a Configuration.
         * @memberof polyglot
         * @interface IConfiguration
         * @property {string} [name] Configuration name
         * @property {polyglot.ICallConfiguration} [call_config] Configuration call_config
         * @property {polyglot.IProtoConfiguration} [proto_config] Configuration proto_config
         * @property {polyglot.IOutputConfiguration} [output_config] Configuration output_config
         */

        /**
         * Constructs a new Configuration.
         * @memberof polyglot
         * @classdesc Represents a Configuration.
         * @constructor
         * @param {polyglot.IConfiguration=} [properties] Properties to set
         */
        function Configuration(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Configuration name.
         * @member {string}name
         * @memberof polyglot.Configuration
         * @instance
         */
        Configuration.prototype.name = "";

        /**
         * Configuration call_config.
         * @member {(polyglot.ICallConfiguration|null|undefined)}call_config
         * @memberof polyglot.Configuration
         * @instance
         */
        Configuration.prototype.call_config = null;

        /**
         * Configuration proto_config.
         * @member {(polyglot.IProtoConfiguration|null|undefined)}proto_config
         * @memberof polyglot.Configuration
         * @instance
         */
        Configuration.prototype.proto_config = null;

        /**
         * Configuration output_config.
         * @member {(polyglot.IOutputConfiguration|null|undefined)}output_config
         * @memberof polyglot.Configuration
         * @instance
         */
        Configuration.prototype.output_config = null;

        /**
         * Creates a new Configuration instance using the specified properties.
         * @function create
         * @memberof polyglot.Configuration
         * @static
         * @param {polyglot.IConfiguration=} [properties] Properties to set
         * @returns {polyglot.Configuration} Configuration instance
         */
        Configuration.create = function create(properties) {
            return new Configuration(properties);
        };

        /**
         * Encodes the specified Configuration message. Does not implicitly {@link polyglot.Configuration.verify|verify} messages.
         * @function encode
         * @memberof polyglot.Configuration
         * @static
         * @param {polyglot.IConfiguration} message Configuration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Configuration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.call_config != null && message.hasOwnProperty("call_config"))
                $root.polyglot.CallConfiguration.encode(message.call_config, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.proto_config != null && message.hasOwnProperty("proto_config"))
                $root.polyglot.ProtoConfiguration.encode(message.proto_config, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.output_config != null && message.hasOwnProperty("output_config"))
                $root.polyglot.OutputConfiguration.encode(message.output_config, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Configuration message, length delimited. Does not implicitly {@link polyglot.Configuration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof polyglot.Configuration
         * @static
         * @param {polyglot.IConfiguration} message Configuration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Configuration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Configuration message from the specified reader or buffer.
         * @function decode
         * @memberof polyglot.Configuration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {polyglot.Configuration} Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Configuration.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.Configuration();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.call_config = $root.polyglot.CallConfiguration.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.proto_config = $root.polyglot.ProtoConfiguration.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.output_config = $root.polyglot.OutputConfiguration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Configuration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof polyglot.Configuration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {polyglot.Configuration} Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Configuration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Configuration message.
         * @function verify
         * @memberof polyglot.Configuration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Configuration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.call_config != null && message.hasOwnProperty("call_config")) {
                var error = $root.polyglot.CallConfiguration.verify(message.call_config);
                if (error)
                    return "call_config." + error;
            }
            if (message.proto_config != null && message.hasOwnProperty("proto_config")) {
                error = $root.polyglot.ProtoConfiguration.verify(message.proto_config);
                if (error)
                    return "proto_config." + error;
            }
            if (message.output_config != null && message.hasOwnProperty("output_config")) {
                error = $root.polyglot.OutputConfiguration.verify(message.output_config);
                if (error)
                    return "output_config." + error;
            }
            return null;
        };

        /**
         * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof polyglot.Configuration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {polyglot.Configuration} Configuration
         */
        Configuration.fromObject = function fromObject(object) {
            if (object instanceof $root.polyglot.Configuration)
                return object;
            var message = new $root.polyglot.Configuration();
            if (object.name != null)
                message.name = String(object.name);
            if (object.call_config != null) {
                if (typeof object.call_config !== "object")
                    throw TypeError(".polyglot.Configuration.call_config: object expected");
                message.call_config = $root.polyglot.CallConfiguration.fromObject(object.call_config);
            }
            if (object.proto_config != null) {
                if (typeof object.proto_config !== "object")
                    throw TypeError(".polyglot.Configuration.proto_config: object expected");
                message.proto_config = $root.polyglot.ProtoConfiguration.fromObject(object.proto_config);
            }
            if (object.output_config != null) {
                if (typeof object.output_config !== "object")
                    throw TypeError(".polyglot.Configuration.output_config: object expected");
                message.output_config = $root.polyglot.OutputConfiguration.fromObject(object.output_config);
            }
            return message;
        };

        /**
         * Creates a plain object from a Configuration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof polyglot.Configuration
         * @static
         * @param {polyglot.Configuration} message Configuration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Configuration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.call_config = null;
                object.proto_config = null;
                object.output_config = null;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.call_config != null && message.hasOwnProperty("call_config"))
                object.call_config = $root.polyglot.CallConfiguration.toObject(message.call_config, options);
            if (message.proto_config != null && message.hasOwnProperty("proto_config"))
                object.proto_config = $root.polyglot.ProtoConfiguration.toObject(message.proto_config, options);
            if (message.output_config != null && message.hasOwnProperty("output_config"))
                object.output_config = $root.polyglot.OutputConfiguration.toObject(message.output_config, options);
            return object;
        };

        /**
         * Converts this Configuration to JSON.
         * @function toJSON
         * @memberof polyglot.Configuration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Configuration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Configuration;
    })();

    polyglot.CallConfiguration = (function() {

        /**
         * Properties of a CallConfiguration.
         * @memberof polyglot
         * @interface ICallConfiguration
         * @property {number} [deadline_ms] CallConfiguration deadline_ms
         * @property {boolean} [use_tls] CallConfiguration use_tls
         * @property {polyglot.IOauthConfiguration} [oauth_config] CallConfiguration oauth_config
         * @property {string} [tls_ca_cert_path] CallConfiguration tls_ca_cert_path
         * @property {string} [tls_client_cert_path] CallConfiguration tls_client_cert_path
         * @property {string} [tls_client_key_path] CallConfiguration tls_client_key_path
         * @property {string} [tls_client_override_authority] CallConfiguration tls_client_override_authority
         */

        /**
         * Constructs a new CallConfiguration.
         * @memberof polyglot
         * @classdesc Represents a CallConfiguration.
         * @constructor
         * @param {polyglot.ICallConfiguration=} [properties] Properties to set
         */
        function CallConfiguration(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CallConfiguration deadline_ms.
         * @member {number}deadline_ms
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.deadline_ms = 0;

        /**
         * CallConfiguration use_tls.
         * @member {boolean}use_tls
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.use_tls = false;

        /**
         * CallConfiguration oauth_config.
         * @member {(polyglot.IOauthConfiguration|null|undefined)}oauth_config
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.oauth_config = null;

        /**
         * CallConfiguration tls_ca_cert_path.
         * @member {string}tls_ca_cert_path
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.tls_ca_cert_path = "";

        /**
         * CallConfiguration tls_client_cert_path.
         * @member {string}tls_client_cert_path
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.tls_client_cert_path = "";

        /**
         * CallConfiguration tls_client_key_path.
         * @member {string}tls_client_key_path
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.tls_client_key_path = "";

        /**
         * CallConfiguration tls_client_override_authority.
         * @member {string}tls_client_override_authority
         * @memberof polyglot.CallConfiguration
         * @instance
         */
        CallConfiguration.prototype.tls_client_override_authority = "";

        /**
         * Creates a new CallConfiguration instance using the specified properties.
         * @function create
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {polyglot.ICallConfiguration=} [properties] Properties to set
         * @returns {polyglot.CallConfiguration} CallConfiguration instance
         */
        CallConfiguration.create = function create(properties) {
            return new CallConfiguration(properties);
        };

        /**
         * Encodes the specified CallConfiguration message. Does not implicitly {@link polyglot.CallConfiguration.verify|verify} messages.
         * @function encode
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {polyglot.ICallConfiguration} message CallConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CallConfiguration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deadline_ms != null && message.hasOwnProperty("deadline_ms"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.deadline_ms);
            if (message.use_tls != null && message.hasOwnProperty("use_tls"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.use_tls);
            if (message.oauth_config != null && message.hasOwnProperty("oauth_config"))
                $root.polyglot.OauthConfiguration.encode(message.oauth_config, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.tls_ca_cert_path != null && message.hasOwnProperty("tls_ca_cert_path"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.tls_ca_cert_path);
            if (message.tls_client_cert_path != null && message.hasOwnProperty("tls_client_cert_path"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.tls_client_cert_path);
            if (message.tls_client_key_path != null && message.hasOwnProperty("tls_client_key_path"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.tls_client_key_path);
            if (message.tls_client_override_authority != null && message.hasOwnProperty("tls_client_override_authority"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.tls_client_override_authority);
            return writer;
        };

        /**
         * Encodes the specified CallConfiguration message, length delimited. Does not implicitly {@link polyglot.CallConfiguration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {polyglot.ICallConfiguration} message CallConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CallConfiguration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CallConfiguration message from the specified reader or buffer.
         * @function decode
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {polyglot.CallConfiguration} CallConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CallConfiguration.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.CallConfiguration();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.deadline_ms = reader.uint32();
                    break;
                case 2:
                    message.use_tls = reader.bool();
                    break;
                case 3:
                    message.oauth_config = $root.polyglot.OauthConfiguration.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.tls_ca_cert_path = reader.string();
                    break;
                case 5:
                    message.tls_client_cert_path = reader.string();
                    break;
                case 6:
                    message.tls_client_key_path = reader.string();
                    break;
                case 7:
                    message.tls_client_override_authority = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CallConfiguration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {polyglot.CallConfiguration} CallConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CallConfiguration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CallConfiguration message.
         * @function verify
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CallConfiguration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deadline_ms != null && message.hasOwnProperty("deadline_ms"))
                if (!$util.isInteger(message.deadline_ms))
                    return "deadline_ms: integer expected";
            if (message.use_tls != null && message.hasOwnProperty("use_tls"))
                if (typeof message.use_tls !== "boolean")
                    return "use_tls: boolean expected";
            if (message.oauth_config != null && message.hasOwnProperty("oauth_config")) {
                var error = $root.polyglot.OauthConfiguration.verify(message.oauth_config);
                if (error)
                    return "oauth_config." + error;
            }
            if (message.tls_ca_cert_path != null && message.hasOwnProperty("tls_ca_cert_path"))
                if (!$util.isString(message.tls_ca_cert_path))
                    return "tls_ca_cert_path: string expected";
            if (message.tls_client_cert_path != null && message.hasOwnProperty("tls_client_cert_path"))
                if (!$util.isString(message.tls_client_cert_path))
                    return "tls_client_cert_path: string expected";
            if (message.tls_client_key_path != null && message.hasOwnProperty("tls_client_key_path"))
                if (!$util.isString(message.tls_client_key_path))
                    return "tls_client_key_path: string expected";
            if (message.tls_client_override_authority != null && message.hasOwnProperty("tls_client_override_authority"))
                if (!$util.isString(message.tls_client_override_authority))
                    return "tls_client_override_authority: string expected";
            return null;
        };

        /**
         * Creates a CallConfiguration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {polyglot.CallConfiguration} CallConfiguration
         */
        CallConfiguration.fromObject = function fromObject(object) {
            if (object instanceof $root.polyglot.CallConfiguration)
                return object;
            var message = new $root.polyglot.CallConfiguration();
            if (object.deadline_ms != null)
                message.deadline_ms = object.deadline_ms >>> 0;
            if (object.use_tls != null)
                message.use_tls = Boolean(object.use_tls);
            if (object.oauth_config != null) {
                if (typeof object.oauth_config !== "object")
                    throw TypeError(".polyglot.CallConfiguration.oauth_config: object expected");
                message.oauth_config = $root.polyglot.OauthConfiguration.fromObject(object.oauth_config);
            }
            if (object.tls_ca_cert_path != null)
                message.tls_ca_cert_path = String(object.tls_ca_cert_path);
            if (object.tls_client_cert_path != null)
                message.tls_client_cert_path = String(object.tls_client_cert_path);
            if (object.tls_client_key_path != null)
                message.tls_client_key_path = String(object.tls_client_key_path);
            if (object.tls_client_override_authority != null)
                message.tls_client_override_authority = String(object.tls_client_override_authority);
            return message;
        };

        /**
         * Creates a plain object from a CallConfiguration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof polyglot.CallConfiguration
         * @static
         * @param {polyglot.CallConfiguration} message CallConfiguration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CallConfiguration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.deadline_ms = 0;
                object.use_tls = false;
                object.oauth_config = null;
                object.tls_ca_cert_path = "";
                object.tls_client_cert_path = "";
                object.tls_client_key_path = "";
                object.tls_client_override_authority = "";
            }
            if (message.deadline_ms != null && message.hasOwnProperty("deadline_ms"))
                object.deadline_ms = message.deadline_ms;
            if (message.use_tls != null && message.hasOwnProperty("use_tls"))
                object.use_tls = message.use_tls;
            if (message.oauth_config != null && message.hasOwnProperty("oauth_config"))
                object.oauth_config = $root.polyglot.OauthConfiguration.toObject(message.oauth_config, options);
            if (message.tls_ca_cert_path != null && message.hasOwnProperty("tls_ca_cert_path"))
                object.tls_ca_cert_path = message.tls_ca_cert_path;
            if (message.tls_client_cert_path != null && message.hasOwnProperty("tls_client_cert_path"))
                object.tls_client_cert_path = message.tls_client_cert_path;
            if (message.tls_client_key_path != null && message.hasOwnProperty("tls_client_key_path"))
                object.tls_client_key_path = message.tls_client_key_path;
            if (message.tls_client_override_authority != null && message.hasOwnProperty("tls_client_override_authority"))
                object.tls_client_override_authority = message.tls_client_override_authority;
            return object;
        };

        /**
         * Converts this CallConfiguration to JSON.
         * @function toJSON
         * @memberof polyglot.CallConfiguration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CallConfiguration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CallConfiguration;
    })();

    polyglot.OauthConfiguration = (function() {

        /**
         * Properties of an OauthConfiguration.
         * @memberof polyglot
         * @interface IOauthConfiguration
         * @property {polyglot.OauthConfiguration.IRefreshTokenCredentials} [refresh_token_credentials] OauthConfiguration refresh_token_credentials
         * @property {polyglot.OauthConfiguration.IAccessTokenCredentials} [access_token_credentials] OauthConfiguration access_token_credentials
         */

        /**
         * Constructs a new OauthConfiguration.
         * @memberof polyglot
         * @classdesc Represents an OauthConfiguration.
         * @constructor
         * @param {polyglot.IOauthConfiguration=} [properties] Properties to set
         */
        function OauthConfiguration(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OauthConfiguration refresh_token_credentials.
         * @member {(polyglot.OauthConfiguration.IRefreshTokenCredentials|null|undefined)}refresh_token_credentials
         * @memberof polyglot.OauthConfiguration
         * @instance
         */
        OauthConfiguration.prototype.refresh_token_credentials = null;

        /**
         * OauthConfiguration access_token_credentials.
         * @member {(polyglot.OauthConfiguration.IAccessTokenCredentials|null|undefined)}access_token_credentials
         * @memberof polyglot.OauthConfiguration
         * @instance
         */
        OauthConfiguration.prototype.access_token_credentials = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * OauthConfiguration credentials.
         * @member {string|undefined} credentials
         * @memberof polyglot.OauthConfiguration
         * @instance
         */
        Object.defineProperty(OauthConfiguration.prototype, "credentials", {
            get: $util.oneOfGetter($oneOfFields = ["refresh_token_credentials", "access_token_credentials"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new OauthConfiguration instance using the specified properties.
         * @function create
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {polyglot.IOauthConfiguration=} [properties] Properties to set
         * @returns {polyglot.OauthConfiguration} OauthConfiguration instance
         */
        OauthConfiguration.create = function create(properties) {
            return new OauthConfiguration(properties);
        };

        /**
         * Encodes the specified OauthConfiguration message. Does not implicitly {@link polyglot.OauthConfiguration.verify|verify} messages.
         * @function encode
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {polyglot.IOauthConfiguration} message OauthConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OauthConfiguration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refresh_token_credentials != null && message.hasOwnProperty("refresh_token_credentials"))
                $root.polyglot.OauthConfiguration.RefreshTokenCredentials.encode(message.refresh_token_credentials, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.access_token_credentials != null && message.hasOwnProperty("access_token_credentials"))
                $root.polyglot.OauthConfiguration.AccessTokenCredentials.encode(message.access_token_credentials, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OauthConfiguration message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {polyglot.IOauthConfiguration} message OauthConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OauthConfiguration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OauthConfiguration message from the specified reader or buffer.
         * @function decode
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {polyglot.OauthConfiguration} OauthConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OauthConfiguration.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.OauthConfiguration();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refresh_token_credentials = $root.polyglot.OauthConfiguration.RefreshTokenCredentials.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.access_token_credentials = $root.polyglot.OauthConfiguration.AccessTokenCredentials.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OauthConfiguration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {polyglot.OauthConfiguration} OauthConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OauthConfiguration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OauthConfiguration message.
         * @function verify
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OauthConfiguration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.refresh_token_credentials != null && message.hasOwnProperty("refresh_token_credentials")) {
                properties.credentials = 1;
                var error = $root.polyglot.OauthConfiguration.RefreshTokenCredentials.verify(message.refresh_token_credentials);
                if (error)
                    return "refresh_token_credentials." + error;
            }
            if (message.access_token_credentials != null && message.hasOwnProperty("access_token_credentials")) {
                if (properties.credentials === 1)
                    return "credentials: multiple values";
                properties.credentials = 1;
                error = $root.polyglot.OauthConfiguration.AccessTokenCredentials.verify(message.access_token_credentials);
                if (error)
                    return "access_token_credentials." + error;
            }
            return null;
        };

        /**
         * Creates an OauthConfiguration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {polyglot.OauthConfiguration} OauthConfiguration
         */
        OauthConfiguration.fromObject = function fromObject(object) {
            if (object instanceof $root.polyglot.OauthConfiguration)
                return object;
            var message = new $root.polyglot.OauthConfiguration();
            if (object.refresh_token_credentials != null) {
                if (typeof object.refresh_token_credentials !== "object")
                    throw TypeError(".polyglot.OauthConfiguration.refresh_token_credentials: object expected");
                message.refresh_token_credentials = $root.polyglot.OauthConfiguration.RefreshTokenCredentials.fromObject(object.refresh_token_credentials);
            }
            if (object.access_token_credentials != null) {
                if (typeof object.access_token_credentials !== "object")
                    throw TypeError(".polyglot.OauthConfiguration.access_token_credentials: object expected");
                message.access_token_credentials = $root.polyglot.OauthConfiguration.AccessTokenCredentials.fromObject(object.access_token_credentials);
            }
            return message;
        };

        /**
         * Creates a plain object from an OauthConfiguration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof polyglot.OauthConfiguration
         * @static
         * @param {polyglot.OauthConfiguration} message OauthConfiguration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OauthConfiguration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.refresh_token_credentials != null && message.hasOwnProperty("refresh_token_credentials")) {
                object.refresh_token_credentials = $root.polyglot.OauthConfiguration.RefreshTokenCredentials.toObject(message.refresh_token_credentials, options);
                if (options.oneofs)
                    object.credentials = "refresh_token_credentials";
            }
            if (message.access_token_credentials != null && message.hasOwnProperty("access_token_credentials")) {
                object.access_token_credentials = $root.polyglot.OauthConfiguration.AccessTokenCredentials.toObject(message.access_token_credentials, options);
                if (options.oneofs)
                    object.credentials = "access_token_credentials";
            }
            return object;
        };

        /**
         * Converts this OauthConfiguration to JSON.
         * @function toJSON
         * @memberof polyglot.OauthConfiguration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OauthConfiguration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        OauthConfiguration.RefreshTokenCredentials = (function() {

            /**
             * Properties of a RefreshTokenCredentials.
             * @memberof polyglot.OauthConfiguration
             * @interface IRefreshTokenCredentials
             * @property {string} [token_endpoint_url] RefreshTokenCredentials token_endpoint_url
             * @property {polyglot.OauthConfiguration.IOauthClient} [client] RefreshTokenCredentials client
             * @property {string} [refresh_token_path] RefreshTokenCredentials refresh_token_path
             */

            /**
             * Constructs a new RefreshTokenCredentials.
             * @memberof polyglot.OauthConfiguration
             * @classdesc Represents a RefreshTokenCredentials.
             * @constructor
             * @param {polyglot.OauthConfiguration.IRefreshTokenCredentials=} [properties] Properties to set
             */
            function RefreshTokenCredentials(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RefreshTokenCredentials token_endpoint_url.
             * @member {string}token_endpoint_url
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @instance
             */
            RefreshTokenCredentials.prototype.token_endpoint_url = "";

            /**
             * RefreshTokenCredentials client.
             * @member {(polyglot.OauthConfiguration.IOauthClient|null|undefined)}client
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @instance
             */
            RefreshTokenCredentials.prototype.client = null;

            /**
             * RefreshTokenCredentials refresh_token_path.
             * @member {string}refresh_token_path
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @instance
             */
            RefreshTokenCredentials.prototype.refresh_token_path = "";

            /**
             * Creates a new RefreshTokenCredentials instance using the specified properties.
             * @function create
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.IRefreshTokenCredentials=} [properties] Properties to set
             * @returns {polyglot.OauthConfiguration.RefreshTokenCredentials} RefreshTokenCredentials instance
             */
            RefreshTokenCredentials.create = function create(properties) {
                return new RefreshTokenCredentials(properties);
            };

            /**
             * Encodes the specified RefreshTokenCredentials message. Does not implicitly {@link polyglot.OauthConfiguration.RefreshTokenCredentials.verify|verify} messages.
             * @function encode
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.IRefreshTokenCredentials} message RefreshTokenCredentials message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RefreshTokenCredentials.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.token_endpoint_url != null && message.hasOwnProperty("token_endpoint_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.token_endpoint_url);
                if (message.client != null && message.hasOwnProperty("client"))
                    $root.polyglot.OauthConfiguration.OauthClient.encode(message.client, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.refresh_token_path != null && message.hasOwnProperty("refresh_token_path"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.refresh_token_path);
                return writer;
            };

            /**
             * Encodes the specified RefreshTokenCredentials message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.RefreshTokenCredentials.verify|verify} messages.
             * @function encodeDelimited
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.IRefreshTokenCredentials} message RefreshTokenCredentials message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RefreshTokenCredentials.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RefreshTokenCredentials message from the specified reader or buffer.
             * @function decode
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {polyglot.OauthConfiguration.RefreshTokenCredentials} RefreshTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RefreshTokenCredentials.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.OauthConfiguration.RefreshTokenCredentials();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.token_endpoint_url = reader.string();
                        break;
                    case 2:
                        message.client = $root.polyglot.OauthConfiguration.OauthClient.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.refresh_token_path = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RefreshTokenCredentials message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {polyglot.OauthConfiguration.RefreshTokenCredentials} RefreshTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RefreshTokenCredentials.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RefreshTokenCredentials message.
             * @function verify
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RefreshTokenCredentials.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.token_endpoint_url != null && message.hasOwnProperty("token_endpoint_url"))
                    if (!$util.isString(message.token_endpoint_url))
                        return "token_endpoint_url: string expected";
                if (message.client != null && message.hasOwnProperty("client")) {
                    var error = $root.polyglot.OauthConfiguration.OauthClient.verify(message.client);
                    if (error)
                        return "client." + error;
                }
                if (message.refresh_token_path != null && message.hasOwnProperty("refresh_token_path"))
                    if (!$util.isString(message.refresh_token_path))
                        return "refresh_token_path: string expected";
                return null;
            };

            /**
             * Creates a RefreshTokenCredentials message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {polyglot.OauthConfiguration.RefreshTokenCredentials} RefreshTokenCredentials
             */
            RefreshTokenCredentials.fromObject = function fromObject(object) {
                if (object instanceof $root.polyglot.OauthConfiguration.RefreshTokenCredentials)
                    return object;
                var message = new $root.polyglot.OauthConfiguration.RefreshTokenCredentials();
                if (object.token_endpoint_url != null)
                    message.token_endpoint_url = String(object.token_endpoint_url);
                if (object.client != null) {
                    if (typeof object.client !== "object")
                        throw TypeError(".polyglot.OauthConfiguration.RefreshTokenCredentials.client: object expected");
                    message.client = $root.polyglot.OauthConfiguration.OauthClient.fromObject(object.client);
                }
                if (object.refresh_token_path != null)
                    message.refresh_token_path = String(object.refresh_token_path);
                return message;
            };

            /**
             * Creates a plain object from a RefreshTokenCredentials message. Also converts values to other types if specified.
             * @function toObject
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.RefreshTokenCredentials} message RefreshTokenCredentials
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RefreshTokenCredentials.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.token_endpoint_url = "";
                    object.client = null;
                    object.refresh_token_path = "";
                }
                if (message.token_endpoint_url != null && message.hasOwnProperty("token_endpoint_url"))
                    object.token_endpoint_url = message.token_endpoint_url;
                if (message.client != null && message.hasOwnProperty("client"))
                    object.client = $root.polyglot.OauthConfiguration.OauthClient.toObject(message.client, options);
                if (message.refresh_token_path != null && message.hasOwnProperty("refresh_token_path"))
                    object.refresh_token_path = message.refresh_token_path;
                return object;
            };

            /**
             * Converts this RefreshTokenCredentials to JSON.
             * @function toJSON
             * @memberof polyglot.OauthConfiguration.RefreshTokenCredentials
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RefreshTokenCredentials.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RefreshTokenCredentials;
        })();

        OauthConfiguration.AccessTokenCredentials = (function() {

            /**
             * Properties of an AccessTokenCredentials.
             * @memberof polyglot.OauthConfiguration
             * @interface IAccessTokenCredentials
             * @property {string} [access_token_path] AccessTokenCredentials access_token_path
             */

            /**
             * Constructs a new AccessTokenCredentials.
             * @memberof polyglot.OauthConfiguration
             * @classdesc Represents an AccessTokenCredentials.
             * @constructor
             * @param {polyglot.OauthConfiguration.IAccessTokenCredentials=} [properties] Properties to set
             */
            function AccessTokenCredentials(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AccessTokenCredentials access_token_path.
             * @member {string}access_token_path
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @instance
             */
            AccessTokenCredentials.prototype.access_token_path = "";

            /**
             * Creates a new AccessTokenCredentials instance using the specified properties.
             * @function create
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.IAccessTokenCredentials=} [properties] Properties to set
             * @returns {polyglot.OauthConfiguration.AccessTokenCredentials} AccessTokenCredentials instance
             */
            AccessTokenCredentials.create = function create(properties) {
                return new AccessTokenCredentials(properties);
            };

            /**
             * Encodes the specified AccessTokenCredentials message. Does not implicitly {@link polyglot.OauthConfiguration.AccessTokenCredentials.verify|verify} messages.
             * @function encode
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.IAccessTokenCredentials} message AccessTokenCredentials message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessTokenCredentials.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.access_token_path != null && message.hasOwnProperty("access_token_path"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.access_token_path);
                return writer;
            };

            /**
             * Encodes the specified AccessTokenCredentials message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.AccessTokenCredentials.verify|verify} messages.
             * @function encodeDelimited
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.IAccessTokenCredentials} message AccessTokenCredentials message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AccessTokenCredentials.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AccessTokenCredentials message from the specified reader or buffer.
             * @function decode
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {polyglot.OauthConfiguration.AccessTokenCredentials} AccessTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessTokenCredentials.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.OauthConfiguration.AccessTokenCredentials();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.access_token_path = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AccessTokenCredentials message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {polyglot.OauthConfiguration.AccessTokenCredentials} AccessTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AccessTokenCredentials.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AccessTokenCredentials message.
             * @function verify
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AccessTokenCredentials.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.access_token_path != null && message.hasOwnProperty("access_token_path"))
                    if (!$util.isString(message.access_token_path))
                        return "access_token_path: string expected";
                return null;
            };

            /**
             * Creates an AccessTokenCredentials message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {polyglot.OauthConfiguration.AccessTokenCredentials} AccessTokenCredentials
             */
            AccessTokenCredentials.fromObject = function fromObject(object) {
                if (object instanceof $root.polyglot.OauthConfiguration.AccessTokenCredentials)
                    return object;
                var message = new $root.polyglot.OauthConfiguration.AccessTokenCredentials();
                if (object.access_token_path != null)
                    message.access_token_path = String(object.access_token_path);
                return message;
            };

            /**
             * Creates a plain object from an AccessTokenCredentials message. Also converts values to other types if specified.
             * @function toObject
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @static
             * @param {polyglot.OauthConfiguration.AccessTokenCredentials} message AccessTokenCredentials
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AccessTokenCredentials.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.access_token_path = "";
                if (message.access_token_path != null && message.hasOwnProperty("access_token_path"))
                    object.access_token_path = message.access_token_path;
                return object;
            };

            /**
             * Converts this AccessTokenCredentials to JSON.
             * @function toJSON
             * @memberof polyglot.OauthConfiguration.AccessTokenCredentials
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AccessTokenCredentials.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AccessTokenCredentials;
        })();

        OauthConfiguration.OauthClient = (function() {

            /**
             * Properties of an OauthClient.
             * @memberof polyglot.OauthConfiguration
             * @interface IOauthClient
             * @property {string} [id] OauthClient id
             * @property {string} [secret] OauthClient secret
             */

            /**
             * Constructs a new OauthClient.
             * @memberof polyglot.OauthConfiguration
             * @classdesc Represents an OauthClient.
             * @constructor
             * @param {polyglot.OauthConfiguration.IOauthClient=} [properties] Properties to set
             */
            function OauthClient(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OauthClient id.
             * @member {string}id
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @instance
             */
            OauthClient.prototype.id = "";

            /**
             * OauthClient secret.
             * @member {string}secret
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @instance
             */
            OauthClient.prototype.secret = "";

            /**
             * Creates a new OauthClient instance using the specified properties.
             * @function create
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {polyglot.OauthConfiguration.IOauthClient=} [properties] Properties to set
             * @returns {polyglot.OauthConfiguration.OauthClient} OauthClient instance
             */
            OauthClient.create = function create(properties) {
                return new OauthClient(properties);
            };

            /**
             * Encodes the specified OauthClient message. Does not implicitly {@link polyglot.OauthConfiguration.OauthClient.verify|verify} messages.
             * @function encode
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {polyglot.OauthConfiguration.IOauthClient} message OauthClient message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OauthClient.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.secret != null && message.hasOwnProperty("secret"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.secret);
                return writer;
            };

            /**
             * Encodes the specified OauthClient message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.OauthClient.verify|verify} messages.
             * @function encodeDelimited
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {polyglot.OauthConfiguration.IOauthClient} message OauthClient message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OauthClient.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OauthClient message from the specified reader or buffer.
             * @function decode
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {polyglot.OauthConfiguration.OauthClient} OauthClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OauthClient.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.OauthConfiguration.OauthClient();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.secret = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an OauthClient message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {polyglot.OauthConfiguration.OauthClient} OauthClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OauthClient.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OauthClient message.
             * @function verify
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OauthClient.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.secret != null && message.hasOwnProperty("secret"))
                    if (!$util.isString(message.secret))
                        return "secret: string expected";
                return null;
            };

            /**
             * Creates an OauthClient message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {polyglot.OauthConfiguration.OauthClient} OauthClient
             */
            OauthClient.fromObject = function fromObject(object) {
                if (object instanceof $root.polyglot.OauthConfiguration.OauthClient)
                    return object;
                var message = new $root.polyglot.OauthConfiguration.OauthClient();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.secret != null)
                    message.secret = String(object.secret);
                return message;
            };

            /**
             * Creates a plain object from an OauthClient message. Also converts values to other types if specified.
             * @function toObject
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @static
             * @param {polyglot.OauthConfiguration.OauthClient} message OauthClient
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OauthClient.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = "";
                    object.secret = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.secret != null && message.hasOwnProperty("secret"))
                    object.secret = message.secret;
                return object;
            };

            /**
             * Converts this OauthClient to JSON.
             * @function toJSON
             * @memberof polyglot.OauthConfiguration.OauthClient
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OauthClient.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return OauthClient;
        })();

        return OauthConfiguration;
    })();

    polyglot.OutputConfiguration = (function() {

        /**
         * Properties of an OutputConfiguration.
         * @memberof polyglot
         * @interface IOutputConfiguration
         * @property {polyglot.OutputConfiguration.Destination} [destination] OutputConfiguration destination
         * @property {string} [file_path] OutputConfiguration file_path
         */

        /**
         * Constructs a new OutputConfiguration.
         * @memberof polyglot
         * @classdesc Represents an OutputConfiguration.
         * @constructor
         * @param {polyglot.IOutputConfiguration=} [properties] Properties to set
         */
        function OutputConfiguration(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OutputConfiguration destination.
         * @member {polyglot.OutputConfiguration.Destination}destination
         * @memberof polyglot.OutputConfiguration
         * @instance
         */
        OutputConfiguration.prototype.destination = 0;

        /**
         * OutputConfiguration file_path.
         * @member {string}file_path
         * @memberof polyglot.OutputConfiguration
         * @instance
         */
        OutputConfiguration.prototype.file_path = "";

        /**
         * Creates a new OutputConfiguration instance using the specified properties.
         * @function create
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {polyglot.IOutputConfiguration=} [properties] Properties to set
         * @returns {polyglot.OutputConfiguration} OutputConfiguration instance
         */
        OutputConfiguration.create = function create(properties) {
            return new OutputConfiguration(properties);
        };

        /**
         * Encodes the specified OutputConfiguration message. Does not implicitly {@link polyglot.OutputConfiguration.verify|verify} messages.
         * @function encode
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {polyglot.IOutputConfiguration} message OutputConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OutputConfiguration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.destination != null && message.hasOwnProperty("destination"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.destination);
            if (message.file_path != null && message.hasOwnProperty("file_path"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.file_path);
            return writer;
        };

        /**
         * Encodes the specified OutputConfiguration message, length delimited. Does not implicitly {@link polyglot.OutputConfiguration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {polyglot.IOutputConfiguration} message OutputConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OutputConfiguration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OutputConfiguration message from the specified reader or buffer.
         * @function decode
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {polyglot.OutputConfiguration} OutputConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OutputConfiguration.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.OutputConfiguration();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.destination = reader.int32();
                    break;
                case 2:
                    message.file_path = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OutputConfiguration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {polyglot.OutputConfiguration} OutputConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OutputConfiguration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OutputConfiguration message.
         * @function verify
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OutputConfiguration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.destination != null && message.hasOwnProperty("destination"))
                switch (message.destination) {
                default:
                    return "destination: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.file_path != null && message.hasOwnProperty("file_path"))
                if (!$util.isString(message.file_path))
                    return "file_path: string expected";
            return null;
        };

        /**
         * Creates an OutputConfiguration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {polyglot.OutputConfiguration} OutputConfiguration
         */
        OutputConfiguration.fromObject = function fromObject(object) {
            if (object instanceof $root.polyglot.OutputConfiguration)
                return object;
            var message = new $root.polyglot.OutputConfiguration();
            switch (object.destination) {
            case "STDOUT":
            case 0:
                message.destination = 0;
                break;
            case "LOG":
            case 1:
                message.destination = 1;
                break;
            case "FILE":
            case 2:
                message.destination = 2;
                break;
            }
            if (object.file_path != null)
                message.file_path = String(object.file_path);
            return message;
        };

        /**
         * Creates a plain object from an OutputConfiguration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof polyglot.OutputConfiguration
         * @static
         * @param {polyglot.OutputConfiguration} message OutputConfiguration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OutputConfiguration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.destination = options.enums === String ? "STDOUT" : 0;
                object.file_path = "";
            }
            if (message.destination != null && message.hasOwnProperty("destination"))
                object.destination = options.enums === String ? $root.polyglot.OutputConfiguration.Destination[message.destination] : message.destination;
            if (message.file_path != null && message.hasOwnProperty("file_path"))
                object.file_path = message.file_path;
            return object;
        };

        /**
         * Converts this OutputConfiguration to JSON.
         * @function toJSON
         * @memberof polyglot.OutputConfiguration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OutputConfiguration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Destination enum.
         * @enum {string}
         * @property {number} STDOUT=0 STDOUT value
         * @property {number} LOG=1 LOG value
         * @property {number} FILE=2 FILE value
         */
        OutputConfiguration.Destination = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STDOUT"] = 0;
            values[valuesById[1] = "LOG"] = 1;
            values[valuesById[2] = "FILE"] = 2;
            return values;
        })();

        return OutputConfiguration;
    })();

    polyglot.ProtoConfiguration = (function() {

        /**
         * Properties of a ProtoConfiguration.
         * @memberof polyglot
         * @interface IProtoConfiguration
         * @property {string} [proto_discovery_root] ProtoConfiguration proto_discovery_root
         * @property {Array.<string>} [include_paths] ProtoConfiguration include_paths
         */

        /**
         * Constructs a new ProtoConfiguration.
         * @memberof polyglot
         * @classdesc Represents a ProtoConfiguration.
         * @constructor
         * @param {polyglot.IProtoConfiguration=} [properties] Properties to set
         */
        function ProtoConfiguration(properties) {
            this.include_paths = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ProtoConfiguration proto_discovery_root.
         * @member {string}proto_discovery_root
         * @memberof polyglot.ProtoConfiguration
         * @instance
         */
        ProtoConfiguration.prototype.proto_discovery_root = "";

        /**
         * ProtoConfiguration include_paths.
         * @member {Array.<string>}include_paths
         * @memberof polyglot.ProtoConfiguration
         * @instance
         */
        ProtoConfiguration.prototype.include_paths = $util.emptyArray;

        /**
         * Creates a new ProtoConfiguration instance using the specified properties.
         * @function create
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {polyglot.IProtoConfiguration=} [properties] Properties to set
         * @returns {polyglot.ProtoConfiguration} ProtoConfiguration instance
         */
        ProtoConfiguration.create = function create(properties) {
            return new ProtoConfiguration(properties);
        };

        /**
         * Encodes the specified ProtoConfiguration message. Does not implicitly {@link polyglot.ProtoConfiguration.verify|verify} messages.
         * @function encode
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {polyglot.IProtoConfiguration} message ProtoConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProtoConfiguration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.proto_discovery_root != null && message.hasOwnProperty("proto_discovery_root"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.proto_discovery_root);
            if (message.include_paths != null && message.include_paths.length)
                for (var i = 0; i < message.include_paths.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.include_paths[i]);
            return writer;
        };

        /**
         * Encodes the specified ProtoConfiguration message, length delimited. Does not implicitly {@link polyglot.ProtoConfiguration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {polyglot.IProtoConfiguration} message ProtoConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProtoConfiguration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ProtoConfiguration message from the specified reader or buffer.
         * @function decode
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {polyglot.ProtoConfiguration} ProtoConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProtoConfiguration.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.polyglot.ProtoConfiguration();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.proto_discovery_root = reader.string();
                    break;
                case 2:
                    if (!(message.include_paths && message.include_paths.length))
                        message.include_paths = [];
                    message.include_paths.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ProtoConfiguration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {polyglot.ProtoConfiguration} ProtoConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProtoConfiguration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ProtoConfiguration message.
         * @function verify
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ProtoConfiguration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.proto_discovery_root != null && message.hasOwnProperty("proto_discovery_root"))
                if (!$util.isString(message.proto_discovery_root))
                    return "proto_discovery_root: string expected";
            if (message.include_paths != null && message.hasOwnProperty("include_paths")) {
                if (!Array.isArray(message.include_paths))
                    return "include_paths: array expected";
                for (var i = 0; i < message.include_paths.length; ++i)
                    if (!$util.isString(message.include_paths[i]))
                        return "include_paths: string[] expected";
            }
            return null;
        };

        /**
         * Creates a ProtoConfiguration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {polyglot.ProtoConfiguration} ProtoConfiguration
         */
        ProtoConfiguration.fromObject = function fromObject(object) {
            if (object instanceof $root.polyglot.ProtoConfiguration)
                return object;
            var message = new $root.polyglot.ProtoConfiguration();
            if (object.proto_discovery_root != null)
                message.proto_discovery_root = String(object.proto_discovery_root);
            if (object.include_paths) {
                if (!Array.isArray(object.include_paths))
                    throw TypeError(".polyglot.ProtoConfiguration.include_paths: array expected");
                message.include_paths = [];
                for (var i = 0; i < object.include_paths.length; ++i)
                    message.include_paths[i] = String(object.include_paths[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a ProtoConfiguration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof polyglot.ProtoConfiguration
         * @static
         * @param {polyglot.ProtoConfiguration} message ProtoConfiguration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ProtoConfiguration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.include_paths = [];
            if (options.defaults)
                object.proto_discovery_root = "";
            if (message.proto_discovery_root != null && message.hasOwnProperty("proto_discovery_root"))
                object.proto_discovery_root = message.proto_discovery_root;
            if (message.include_paths && message.include_paths.length) {
                object.include_paths = [];
                for (var j = 0; j < message.include_paths.length; ++j)
                    object.include_paths[j] = message.include_paths[j];
            }
            return object;
        };

        /**
         * Converts this ProtoConfiguration to JSON.
         * @function toJSON
         * @memberof polyglot.ProtoConfiguration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ProtoConfiguration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ProtoConfiguration;
    })();

    return polyglot;
})();

module.exports = $root;
