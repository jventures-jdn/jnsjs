# jnsjs

A JavaScript library for advanced front-end development.

## Project Preparation

- support registerWithId function/interfaces with pr#1

# jns-metadata-service

## Patches

In order for the avatar resolver to retrieve avatar uri or metadata for a given name, we need to patch a specific library (ethersproject/provider).

- Changing eth to jfin name check in base-provider.js
- Adding jfin/jfintestnet with the registry address to the network

## Cloudrun Deployment

Prepare docker-compose file with the following 
- eth_registrar address
- name_wrapper address
- name_manager address 
- rpc provider 
- subgraph url
- s3 bucket credentials

For dockerfile, we use bookworm node to reduce size

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

# jns avatar buckets

## Mainnet

- jns
- jns-takedown

## Testnet

- jns-testnet
- jns-takedown-testnet

In each environment, there are two buckets designated to segregate takedown name avatars from valid name avatars. 
Additionally, a unique token is generated for each environment to facilitate the management of S3 object copy and deletion.

# jns-bridge 

## Cloudflare R2 Worker Deployment

Modify wrangler.toml to include the following

- explorer url 
- rpc url
- multicall address
- multicall block number
- universal resolver address
- universal block number
- registry address
- registry block number
- admin contract address

## Running Dev Server

```bash
yarn
yarn dev
```
# jns-app-v3
