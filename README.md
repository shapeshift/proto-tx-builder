# proto-tx-builder
Constructs and signs protobuf encoded cosmos-sdk 
## Getting started

```bash
# Install the required dependencies
yarn
```

## Testing

Bug fixes and features should always come with tests, when applicable. Test files should live next to the file they are testing. Before submitting your changes in a pull request, always run the full test suite.

To run the test suite:

```bash
# build all dependent packages
yarn build

# Runs the full test suite
yarn test
```

## TS Proto generation
cosmos-sdk uses [protocol buffers](https://developers.google.com/protocol-buffers) to encode txs and other communication between nodes and clients as well as other nodes. proto-tx-builder leverages the protobuf definitions to generate the TypeScript implementation of the custom protobufs required to interact with a given chain.

- place .proto files for the cosmos-sdk chain in `./proto` and `./third_party/proto` directories
- remove existing generated files:
    ```bash
    rm -rf ./proto/generated/*
    ```
- execute the generation script:
    ```base
    ./gen.sh
    ```
- commit the generated content along with your changes

## Contributing

Please see the [Contributing Guidelines](CONTRIBUTING.md) document for this repo's specific contributing guidelines.
