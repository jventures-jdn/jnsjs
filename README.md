# jnsjs

A JavaScript library for advanced front-end development.

# jns-metadata-service

## Patches

In order for the avatar resolver to retrieve avatar uri or metadata for a given name, we need to patch a specific library (ethersproject/provider).

- Changing eth to jfin name check in base-provider.js
- Adding jfintestnet with the registry address to the network

## Cloudrun Deployment

- Prepare docker-compose file with eth_registrar address, name_wrapper address,rpc_provider and subgraph url
- For dockerfile, we use bookworm node to reduce size

## Project Preparation

- Disable vpcAccessConnect check in appconfgen.js
- Disable INAMEWRAPPER interface id check in service/contract.ts
- Disable isWrapped check for namehash in service/avatar.ts
- Add network, subgraph url, and rpc url to network.ts
- Replace https://metadata.ens.domains baseUrl with the deployed metadata-service url

## Running Dev Server

```bash
yarn
yarn dev
```

# jns-avatar-worker

## Cloudflare R2 Worker Deployment

- Modify wrangler.toml to include the service name, account id, bucket name
- Add registry, name wrapper, base registrar, multicall addresses to wrangler.toml. This includes the network info.

## Project Preparation

- Exclude "/" + network from base web3 endpoint in src/utils.ts
- Change tld check from eth to jfin in src/utils.ts

## Running Dev Server

```bash
pnpm
pnpm start
```
