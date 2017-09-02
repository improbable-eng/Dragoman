import * as $protobuf from "protobufjs";

/** Namespace polyglot. */
export namespace polyglot {

    /** Properties of a ConfigurationSet. */
    interface IConfigurationSet {

        /** ConfigurationSet configurations */
        configurations?: polyglot.IConfiguration[];
    }

    /** Represents a ConfigurationSet. */
    class ConfigurationSet {

        /**
         * Constructs a new ConfigurationSet.
         * @param [properties] Properties to set
         */
        constructor(properties?: polyglot.IConfigurationSet);

        /** ConfigurationSet configurations. */
        public configurations: polyglot.IConfiguration[];

        /**
         * Creates a new ConfigurationSet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConfigurationSet instance
         */
        public static create(properties?: polyglot.IConfigurationSet): polyglot.ConfigurationSet;

        /**
         * Encodes the specified ConfigurationSet message. Does not implicitly {@link polyglot.ConfigurationSet.verify|verify} messages.
         * @param message ConfigurationSet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: polyglot.IConfigurationSet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConfigurationSet message, length delimited. Does not implicitly {@link polyglot.ConfigurationSet.verify|verify} messages.
         * @param message ConfigurationSet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: polyglot.IConfigurationSet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConfigurationSet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConfigurationSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.ConfigurationSet;

        /**
         * Decodes a ConfigurationSet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConfigurationSet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.ConfigurationSet;

        /**
         * Verifies a ConfigurationSet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConfigurationSet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConfigurationSet
         */
        public static fromObject(object: { [k: string]: any }): polyglot.ConfigurationSet;

        /**
         * Creates a plain object from a ConfigurationSet message. Also converts values to other types if specified.
         * @param message ConfigurationSet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: polyglot.ConfigurationSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConfigurationSet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Configuration. */
    interface IConfiguration {

        /** Configuration name */
        name?: string;

        /** Configuration call_config */
        call_config?: polyglot.ICallConfiguration;

        /** Configuration proto_config */
        proto_config?: polyglot.IProtoConfiguration;

        /** Configuration output_config */
        output_config?: polyglot.IOutputConfiguration;
    }

    /** Represents a Configuration. */
    class Configuration {

        /**
         * Constructs a new Configuration.
         * @param [properties] Properties to set
         */
        constructor(properties?: polyglot.IConfiguration);

        /** Configuration name. */
        public name: string;

        /** Configuration call_config. */
        public call_config?: (polyglot.ICallConfiguration|null);

        /** Configuration proto_config. */
        public proto_config?: (polyglot.IProtoConfiguration|null);

        /** Configuration output_config. */
        public output_config?: (polyglot.IOutputConfiguration|null);

        /**
         * Creates a new Configuration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Configuration instance
         */
        public static create(properties?: polyglot.IConfiguration): polyglot.Configuration;

        /**
         * Encodes the specified Configuration message. Does not implicitly {@link polyglot.Configuration.verify|verify} messages.
         * @param message Configuration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: polyglot.IConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Configuration message, length delimited. Does not implicitly {@link polyglot.Configuration.verify|verify} messages.
         * @param message Configuration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: polyglot.IConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Configuration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.Configuration;

        /**
         * Decodes a Configuration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Configuration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.Configuration;

        /**
         * Verifies a Configuration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Configuration
         */
        public static fromObject(object: { [k: string]: any }): polyglot.Configuration;

        /**
         * Creates a plain object from a Configuration message. Also converts values to other types if specified.
         * @param message Configuration
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: polyglot.Configuration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Configuration to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CallConfiguration. */
    interface ICallConfiguration {

        /** CallConfiguration deadline_ms */
        deadline_ms?: number;

        /** CallConfiguration use_tls */
        use_tls?: boolean;

        /** CallConfiguration oauth_config */
        oauth_config?: polyglot.IOauthConfiguration;

        /** CallConfiguration tls_ca_cert_path */
        tls_ca_cert_path?: string;

        /** CallConfiguration tls_client_cert_path */
        tls_client_cert_path?: string;

        /** CallConfiguration tls_client_key_path */
        tls_client_key_path?: string;

        /** CallConfiguration tls_client_override_authority */
        tls_client_override_authority?: string;
    }

    /** Represents a CallConfiguration. */
    class CallConfiguration {

        /**
         * Constructs a new CallConfiguration.
         * @param [properties] Properties to set
         */
        constructor(properties?: polyglot.ICallConfiguration);

        /** CallConfiguration deadline_ms. */
        public deadline_ms: number;

        /** CallConfiguration use_tls. */
        public use_tls: boolean;

        /** CallConfiguration oauth_config. */
        public oauth_config?: (polyglot.IOauthConfiguration|null);

        /** CallConfiguration tls_ca_cert_path. */
        public tls_ca_cert_path: string;

        /** CallConfiguration tls_client_cert_path. */
        public tls_client_cert_path: string;

        /** CallConfiguration tls_client_key_path. */
        public tls_client_key_path: string;

        /** CallConfiguration tls_client_override_authority. */
        public tls_client_override_authority: string;

        /**
         * Creates a new CallConfiguration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CallConfiguration instance
         */
        public static create(properties?: polyglot.ICallConfiguration): polyglot.CallConfiguration;

        /**
         * Encodes the specified CallConfiguration message. Does not implicitly {@link polyglot.CallConfiguration.verify|verify} messages.
         * @param message CallConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: polyglot.ICallConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CallConfiguration message, length delimited. Does not implicitly {@link polyglot.CallConfiguration.verify|verify} messages.
         * @param message CallConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: polyglot.ICallConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CallConfiguration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CallConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.CallConfiguration;

        /**
         * Decodes a CallConfiguration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CallConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.CallConfiguration;

        /**
         * Verifies a CallConfiguration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CallConfiguration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CallConfiguration
         */
        public static fromObject(object: { [k: string]: any }): polyglot.CallConfiguration;

        /**
         * Creates a plain object from a CallConfiguration message. Also converts values to other types if specified.
         * @param message CallConfiguration
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: polyglot.CallConfiguration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CallConfiguration to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OauthConfiguration. */
    interface IOauthConfiguration {

        /** OauthConfiguration refresh_token_credentials */
        refresh_token_credentials?: polyglot.OauthConfiguration.IRefreshTokenCredentials;

        /** OauthConfiguration access_token_credentials */
        access_token_credentials?: polyglot.OauthConfiguration.IAccessTokenCredentials;
    }

    /** Represents an OauthConfiguration. */
    class OauthConfiguration {

        /**
         * Constructs a new OauthConfiguration.
         * @param [properties] Properties to set
         */
        constructor(properties?: polyglot.IOauthConfiguration);

        /** OauthConfiguration refresh_token_credentials. */
        public refresh_token_credentials?: (polyglot.OauthConfiguration.IRefreshTokenCredentials|null);

        /** OauthConfiguration access_token_credentials. */
        public access_token_credentials?: (polyglot.OauthConfiguration.IAccessTokenCredentials|null);

        /** OauthConfiguration credentials. */
        public credentials?: string;

        /**
         * Creates a new OauthConfiguration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OauthConfiguration instance
         */
        public static create(properties?: polyglot.IOauthConfiguration): polyglot.OauthConfiguration;

        /**
         * Encodes the specified OauthConfiguration message. Does not implicitly {@link polyglot.OauthConfiguration.verify|verify} messages.
         * @param message OauthConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: polyglot.IOauthConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OauthConfiguration message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.verify|verify} messages.
         * @param message OauthConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: polyglot.IOauthConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OauthConfiguration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OauthConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.OauthConfiguration;

        /**
         * Decodes an OauthConfiguration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OauthConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.OauthConfiguration;

        /**
         * Verifies an OauthConfiguration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OauthConfiguration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OauthConfiguration
         */
        public static fromObject(object: { [k: string]: any }): polyglot.OauthConfiguration;

        /**
         * Creates a plain object from an OauthConfiguration message. Also converts values to other types if specified.
         * @param message OauthConfiguration
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: polyglot.OauthConfiguration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OauthConfiguration to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace OauthConfiguration {

        /** Properties of a RefreshTokenCredentials. */
        interface IRefreshTokenCredentials {

            /** RefreshTokenCredentials token_endpoint_url */
            token_endpoint_url?: string;

            /** RefreshTokenCredentials client */
            client?: polyglot.OauthConfiguration.IOauthClient;

            /** RefreshTokenCredentials refresh_token_path */
            refresh_token_path?: string;
        }

        /** Represents a RefreshTokenCredentials. */
        class RefreshTokenCredentials {

            /**
             * Constructs a new RefreshTokenCredentials.
             * @param [properties] Properties to set
             */
            constructor(properties?: polyglot.OauthConfiguration.IRefreshTokenCredentials);

            /** RefreshTokenCredentials token_endpoint_url. */
            public token_endpoint_url: string;

            /** RefreshTokenCredentials client. */
            public client?: (polyglot.OauthConfiguration.IOauthClient|null);

            /** RefreshTokenCredentials refresh_token_path. */
            public refresh_token_path: string;

            /**
             * Creates a new RefreshTokenCredentials instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RefreshTokenCredentials instance
             */
            public static create(properties?: polyglot.OauthConfiguration.IRefreshTokenCredentials): polyglot.OauthConfiguration.RefreshTokenCredentials;

            /**
             * Encodes the specified RefreshTokenCredentials message. Does not implicitly {@link polyglot.OauthConfiguration.RefreshTokenCredentials.verify|verify} messages.
             * @param message RefreshTokenCredentials message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: polyglot.OauthConfiguration.IRefreshTokenCredentials, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RefreshTokenCredentials message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.RefreshTokenCredentials.verify|verify} messages.
             * @param message RefreshTokenCredentials message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: polyglot.OauthConfiguration.IRefreshTokenCredentials, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RefreshTokenCredentials message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RefreshTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.OauthConfiguration.RefreshTokenCredentials;

            /**
             * Decodes a RefreshTokenCredentials message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RefreshTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.OauthConfiguration.RefreshTokenCredentials;

            /**
             * Verifies a RefreshTokenCredentials message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RefreshTokenCredentials message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RefreshTokenCredentials
             */
            public static fromObject(object: { [k: string]: any }): polyglot.OauthConfiguration.RefreshTokenCredentials;

            /**
             * Creates a plain object from a RefreshTokenCredentials message. Also converts values to other types if specified.
             * @param message RefreshTokenCredentials
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: polyglot.OauthConfiguration.RefreshTokenCredentials, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RefreshTokenCredentials to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an AccessTokenCredentials. */
        interface IAccessTokenCredentials {

            /** AccessTokenCredentials access_token_path */
            access_token_path?: string;
        }

        /** Represents an AccessTokenCredentials. */
        class AccessTokenCredentials {

            /**
             * Constructs a new AccessTokenCredentials.
             * @param [properties] Properties to set
             */
            constructor(properties?: polyglot.OauthConfiguration.IAccessTokenCredentials);

            /** AccessTokenCredentials access_token_path. */
            public access_token_path: string;

            /**
             * Creates a new AccessTokenCredentials instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AccessTokenCredentials instance
             */
            public static create(properties?: polyglot.OauthConfiguration.IAccessTokenCredentials): polyglot.OauthConfiguration.AccessTokenCredentials;

            /**
             * Encodes the specified AccessTokenCredentials message. Does not implicitly {@link polyglot.OauthConfiguration.AccessTokenCredentials.verify|verify} messages.
             * @param message AccessTokenCredentials message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: polyglot.OauthConfiguration.IAccessTokenCredentials, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified AccessTokenCredentials message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.AccessTokenCredentials.verify|verify} messages.
             * @param message AccessTokenCredentials message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: polyglot.OauthConfiguration.IAccessTokenCredentials, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an AccessTokenCredentials message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AccessTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.OauthConfiguration.AccessTokenCredentials;

            /**
             * Decodes an AccessTokenCredentials message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AccessTokenCredentials
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.OauthConfiguration.AccessTokenCredentials;

            /**
             * Verifies an AccessTokenCredentials message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an AccessTokenCredentials message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AccessTokenCredentials
             */
            public static fromObject(object: { [k: string]: any }): polyglot.OauthConfiguration.AccessTokenCredentials;

            /**
             * Creates a plain object from an AccessTokenCredentials message. Also converts values to other types if specified.
             * @param message AccessTokenCredentials
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: polyglot.OauthConfiguration.AccessTokenCredentials, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this AccessTokenCredentials to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an OauthClient. */
        interface IOauthClient {

            /** OauthClient id */
            id?: string;

            /** OauthClient secret */
            secret?: string;
        }

        /** Represents an OauthClient. */
        class OauthClient {

            /**
             * Constructs a new OauthClient.
             * @param [properties] Properties to set
             */
            constructor(properties?: polyglot.OauthConfiguration.IOauthClient);

            /** OauthClient id. */
            public id: string;

            /** OauthClient secret. */
            public secret: string;

            /**
             * Creates a new OauthClient instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OauthClient instance
             */
            public static create(properties?: polyglot.OauthConfiguration.IOauthClient): polyglot.OauthConfiguration.OauthClient;

            /**
             * Encodes the specified OauthClient message. Does not implicitly {@link polyglot.OauthConfiguration.OauthClient.verify|verify} messages.
             * @param message OauthClient message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: polyglot.OauthConfiguration.IOauthClient, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OauthClient message, length delimited. Does not implicitly {@link polyglot.OauthConfiguration.OauthClient.verify|verify} messages.
             * @param message OauthClient message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: polyglot.OauthConfiguration.IOauthClient, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OauthClient message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OauthClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.OauthConfiguration.OauthClient;

            /**
             * Decodes an OauthClient message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OauthClient
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.OauthConfiguration.OauthClient;

            /**
             * Verifies an OauthClient message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OauthClient message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OauthClient
             */
            public static fromObject(object: { [k: string]: any }): polyglot.OauthConfiguration.OauthClient;

            /**
             * Creates a plain object from an OauthClient message. Also converts values to other types if specified.
             * @param message OauthClient
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: polyglot.OauthConfiguration.OauthClient, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OauthClient to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an OutputConfiguration. */
    interface IOutputConfiguration {

        /** OutputConfiguration destination */
        destination?: polyglot.OutputConfiguration.Destination;

        /** OutputConfiguration file_path */
        file_path?: string;
    }

    /** Represents an OutputConfiguration. */
    class OutputConfiguration {

        /**
         * Constructs a new OutputConfiguration.
         * @param [properties] Properties to set
         */
        constructor(properties?: polyglot.IOutputConfiguration);

        /** OutputConfiguration destination. */
        public destination: polyglot.OutputConfiguration.Destination;

        /** OutputConfiguration file_path. */
        public file_path: string;

        /**
         * Creates a new OutputConfiguration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OutputConfiguration instance
         */
        public static create(properties?: polyglot.IOutputConfiguration): polyglot.OutputConfiguration;

        /**
         * Encodes the specified OutputConfiguration message. Does not implicitly {@link polyglot.OutputConfiguration.verify|verify} messages.
         * @param message OutputConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: polyglot.IOutputConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OutputConfiguration message, length delimited. Does not implicitly {@link polyglot.OutputConfiguration.verify|verify} messages.
         * @param message OutputConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: polyglot.IOutputConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OutputConfiguration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OutputConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.OutputConfiguration;

        /**
         * Decodes an OutputConfiguration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OutputConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.OutputConfiguration;

        /**
         * Verifies an OutputConfiguration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OutputConfiguration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OutputConfiguration
         */
        public static fromObject(object: { [k: string]: any }): polyglot.OutputConfiguration;

        /**
         * Creates a plain object from an OutputConfiguration message. Also converts values to other types if specified.
         * @param message OutputConfiguration
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: polyglot.OutputConfiguration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OutputConfiguration to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace OutputConfiguration {

        /** Destination enum. */
        enum Destination {
            STDOUT = 0,
            LOG = 1,
            FILE = 2
        }
    }

    /** Properties of a ProtoConfiguration. */
    interface IProtoConfiguration {

        /** ProtoConfiguration proto_discovery_root */
        proto_discovery_root?: string;

        /** ProtoConfiguration include_paths */
        include_paths?: string[];
    }

    /** Represents a ProtoConfiguration. */
    class ProtoConfiguration {

        /**
         * Constructs a new ProtoConfiguration.
         * @param [properties] Properties to set
         */
        constructor(properties?: polyglot.IProtoConfiguration);

        /** ProtoConfiguration proto_discovery_root. */
        public proto_discovery_root: string;

        /** ProtoConfiguration include_paths. */
        public include_paths: string[];

        /**
         * Creates a new ProtoConfiguration instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoConfiguration instance
         */
        public static create(properties?: polyglot.IProtoConfiguration): polyglot.ProtoConfiguration;

        /**
         * Encodes the specified ProtoConfiguration message. Does not implicitly {@link polyglot.ProtoConfiguration.verify|verify} messages.
         * @param message ProtoConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: polyglot.IProtoConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProtoConfiguration message, length delimited. Does not implicitly {@link polyglot.ProtoConfiguration.verify|verify} messages.
         * @param message ProtoConfiguration message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: polyglot.IProtoConfiguration, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProtoConfiguration message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): polyglot.ProtoConfiguration;

        /**
         * Decodes a ProtoConfiguration message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): polyglot.ProtoConfiguration;

        /**
         * Verifies a ProtoConfiguration message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProtoConfiguration message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProtoConfiguration
         */
        public static fromObject(object: { [k: string]: any }): polyglot.ProtoConfiguration;

        /**
         * Creates a plain object from a ProtoConfiguration message. Also converts values to other types if specified.
         * @param message ProtoConfiguration
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: polyglot.ProtoConfiguration, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProtoConfiguration to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
