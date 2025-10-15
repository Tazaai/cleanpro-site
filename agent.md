## 🧭 Reading PROJECT_GUIDE.md context...
✅ Project guide loaded.
## 🔍 Validating base structure...
🩹 Recreating backend/index.js
## 🔑 Checking required secrets...
✅ GOOGLE_MAPS_API_KEY OK
✅ GCP_PROJECT OK
✅ GCP_SA_KEY OK
✅ FIREBASE_KEY OK
## 🔐 Authenticating to Google Cloud...
Activated service account credentials for: [github-deployer@cleanpro-site.iam.gserviceaccount.com]
Updated property [core/account].
WARNING: INVALID_ARGUMENT: Request contains an invalid argument.
Updated property [core/project].
Updated property [run/region].
## 🐳 Verifying Dockerfile...
## 🎨 Checking frontend...

added 344 packages, and audited 345 packages in 18s

47 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

> cleanpro-frontend@1.0.0 build
> vite build

[36mvite v4.5.14 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 69 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.70 kB[22m[1m[22m[2m │ gzip:  0.40 kB[22m
[2mdist/[22m[2massets/[22m[35mindex-39fedcd9.css  [39m[1m[2m 16.10 kB[22m[1m[22m[2m │ gzip:  3.73 kB[22m
[2mdist/[22m[2massets/[22m[36mindex-b4cf7e65.js   [39m[1m[2m201.34 kB[22m[1m[22m[2m │ gzip: 63.48 kB[22m
[32m✓ built in 2.08s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760531779.096469-79274fe8baac4b4b8ad1fc3667cb7108.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/ed9c7607-78d1-46c2-b16e-801fa3fd391d].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/ed9c7607-78d1-46c2-b16e-801fa3fd391d?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "ed9c7607-78d1-46c2-b16e-801fa3fd391d"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760531779.096469-79274fe8baac4b4b8ad1fc3667cb7108.tgz#1760531798430936
Copying gs://cleanpro-site_cloudbuild/source/1760531779.096469-79274fe8baac4b4b8ad1fc3667cb7108.tgz#1760531798430936...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/14 : FROM node:20
20: Pulling from library/node
c6b11972fd12: Already exists
db3dba6026a3: Already exists
5fb1b35a6fc1: Already exists
d6ecbfb3e7f8: Already exists
b44b21b18714: Pulling fs layer
ae6f95508495: Pulling fs layer
1b7f8e1ff922: Pulling fs layer
eaf2cbadb0df: Pulling fs layer
eaf2cbadb0df: Waiting
1b7f8e1ff922: Verifying Checksum
1b7f8e1ff922: Download complete
b44b21b18714: Verifying Checksum
b44b21b18714: Download complete
b44b21b18714: Pull complete
eaf2cbadb0df: Verifying Checksum
eaf2cbadb0df: Download complete
ae6f95508495: Verifying Checksum
ae6f95508495: Download complete
ae6f95508495: Pull complete
1b7f8e1ff922: Pull complete
eaf2cbadb0df: Pull complete
Digest: sha256:8cdc6b9b711af0711cc6139955cc1331fab5e0a995afd3260c52736fbc338059
Status: Downloaded newer image for node:20
 ---> f6f3cc67eec4
Step 2/14 : WORKDIR /app/backend
 ---> Running in 735c5f168316
Removing intermediate container 735c5f168316
 ---> 75fac870e517
Step 3/14 : WORKDIR /app/backend
 ---> Running in 258d1c52ee39
Removing intermediate container 258d1c52ee39
 ---> 3d205c6ec896
Step 4/14 : COPY package*.json ./
 ---> 20314166964a
Step 5/14 : RUN npm install --omit=dev
 ---> Running in 383663fa6e9d
[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 21s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 383663fa6e9d
 ---> 87bd518af2da
Step 6/14 : COPY . .
 ---> ad2e9e369118
Step 7/14 : ENV PORT=8080
 ---> Running in 084c7bdaacb3
Removing intermediate container 084c7bdaacb3
 ---> 5fb6dba22a4b
Step 8/14 : ENV HOST=0.0.0.0
 ---> Running in 76140d3faaff
Removing intermediate container 76140d3faaff
 ---> d5efa72d78ea
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7f299b9e5d9e
Removing intermediate container 7f299b9e5d9e
 ---> 5013e4739721
Step 10/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in d16a2bf04355
Removing intermediate container d16a2bf04355
 ---> 61a5af0a5a6f
Step 11/14 : EXPOSE 8080
 ---> Running in 0dd5f5f0313a
Removing intermediate container 0dd5f5f0313a
 ---> e28359e35217
Step 12/14 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in 2384f27b15e2
Removing intermediate container 2384f27b15e2
 ---> 9f6bb92079be
Step 13/14 : CMD ["node", "index.js"]
 ---> Running in 1b27778c1d4f
Removing intermediate container 1b27778c1d4f
 ---> bd45eeb314b8
Step 14/14 : CMD ["node","index.js"]
 ---> Running in 64df81fb1c54
Removing intermediate container 64df81fb1c54
 ---> e212c9ab459c
Successfully built e212c9ab459c
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
b08ad1560d83: Preparing
76dfccaa61c2: Preparing
27d25db8a900: Preparing
e60b4fb4c715: Preparing
bb9b55128ba0: Preparing
856b4ab3e742: Preparing
69368a71b175: Preparing
316cddb5fa75: Preparing
1bd72b149259: Preparing
060ee1077a8d: Preparing
3f1630e3667f: Preparing
3b385b8d2549: Preparing
316cddb5fa75: Waiting
1bd72b149259: Waiting
856b4ab3e742: Waiting
69368a71b175: Waiting
060ee1077a8d: Waiting
3f1630e3667f: Waiting
3b385b8d2549: Waiting
bb9b55128ba0: Layer already exists
856b4ab3e742: Layer already exists
e60b4fb4c715: Pushed
69368a71b175: Layer already exists
27d25db8a900: Pushed
1bd72b149259: Layer already exists
316cddb5fa75: Layer already exists
060ee1077a8d: Layer already exists
3f1630e3667f: Layer already exists
3b385b8d2549: Layer already exists
b08ad1560d83: Pushed
76dfccaa61c2: Pushed
latest: digest: sha256:fd47d3e52962dc886d5ee9084869d65985383a3f024b889c55cf739c62421de7 size: 2845
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
ed9c7607-78d1-46c2-b16e-801fa3fd391d  2025-10-15T12:36:38+00:00  1M56S     gs://cleanpro-site_cloudbuild/source/1760531779.096469-79274fe8baac4b4b8ad1fc3667cb7108.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.....................done
Creating Revision...............................................................................................................................................................................................................................................................................................................................................done
Routing traffic.....done
Done.
Service [cleanpro-backend] revision [cleanpro-backend-00609-pdm] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-backend-5539254765.europe-west1.run.app
deploy_backend.sh: line 29: --platform=managed: command not found
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/12.39.28.911162.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760531969.125382-c70b44c3360c404ea0c4bd97a56aec5a.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/18ea5e11-1fc1-4a5e-86e4-b0c6d200729d].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/18ea5e11-1fc1-4a5e-86e4-b0c6d200729d?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "18ea5e11-1fc1-4a5e-86e4-b0c6d200729d"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760531969.125382-c70b44c3360c404ea0c4bd97a56aec5a.tgz#1760531969592837
Copying gs://cleanpro-site_cloudbuild/source/1760531969.125382-c70b44c3360c404ea0c4bd97a56aec5a.tgz#1760531969592837...
/ [0 files][    0.0 B/163.7 KiB]                                                / [1 files][163.7 KiB/163.7 KiB]                                                
Operation completed over 1 objects/163.7 KiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    340kB
Step 1/11 : FROM node:20-alpine AS build
20-alpine: Pulling from library/node
2d35ebdb57d9: Already exists
c087321cece4: Pulling fs layer
f2fbe8556258: Pulling fs layer
c74c90aa7c87: Pulling fs layer
c74c90aa7c87: Verifying Checksum
c74c90aa7c87: Download complete
f2fbe8556258: Verifying Checksum
f2fbe8556258: Download complete
c087321cece4: Verifying Checksum
c087321cece4: Download complete
c087321cece4: Pull complete
f2fbe8556258: Pull complete
c74c90aa7c87: Pull complete
Digest: sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
Status: Downloaded newer image for node:20-alpine
 ---> 30c8b6e55a5d
Step 2/11 : WORKDIR /app
 ---> Running in 48b7be427f21
Removing intermediate container 48b7be427f21
 ---> b39bd5920022
Step 3/11 : COPY package*.json ./
 ---> 7cc976aeb92c
Step 4/11 : RUN npm install
 ---> Running in b02ca52c0dd9

added 346 packages, and audited 347 packages in 30s

47 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container b02ca52c0dd9
 ---> 266fd9fb7688
Step 5/11 : COPY . .
 ---> f0b0bf5fd202
Step 6/11 : RUN npm run build
 ---> Running in a2cd1a0d029f

> cleanpro-frontend@1.0.0 build
> vite build
vite v4.5.14 building for production...
transforming...
✓ 69 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.70 kB │ gzip:  0.40 kB
dist/assets/index-39fedcd9.css   16.10 kB │ gzip:  3.73 kB
dist/assets/index-b4cf7e65.js   201.34 kB │ gzip: 63.48 kB
✓ built in 5.23s
Removing intermediate container a2cd1a0d029f
 ---> 321d162a8a7a
Step 7/11 : FROM nginx:alpine
alpine: Pulling from library/nginx
2d35ebdb57d9: Already exists
f80aba050ead: Pulling fs layer
621a51978ed7: Pulling fs layer
03e63548f209: Pulling fs layer
83ce83cd9960: Pulling fs layer
e2d0ea5d3690: Pulling fs layer
7fb80c2f28bc: Pulling fs layer
76c9bcaa4163: Pulling fs layer
83ce83cd9960: Waiting
e2d0ea5d3690: Waiting
7fb80c2f28bc: Waiting
76c9bcaa4163: Waiting
621a51978ed7: Verifying Checksum
621a51978ed7: Download complete
03e63548f209: Download complete
f80aba050ead: Verifying Checksum
f80aba050ead: Pull complete
621a51978ed7: Pull complete
03e63548f209: Pull complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
e2d0ea5d3690: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
83ce83cd9960: Pull complete
e2d0ea5d3690: Pull complete
7fb80c2f28bc: Pull complete
76c9bcaa4163: Verifying Checksum
76c9bcaa4163: Download complete
76c9bcaa4163: Pull complete
Digest: sha256:61e01287e546aac28a3f56839c136b31f590273f3b41187a36f46f6a03bbfe22
Status: Downloaded newer image for nginx:alpine
 ---> 5e7abcdd2021
Step 8/11 : COPY --from=build /app/dist /usr/share/nginx/html
 ---> aa796119ef63
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 72a0224f14ec
Step 10/11 : EXPOSE 8080
 ---> Running in 5f8cd0e8a265
Removing intermediate container 5f8cd0e8a265
 ---> 3260eb01af5e
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in 9c62ec99016f
Removing intermediate container 9c62ec99016f
 ---> 121f0aef4ee9
Successfully built 121f0aef4ee9
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
b587d4505b8d: Preparing
b281c28906e9: Preparing
e9a26559275d: Preparing
1704c5a3d8da: Preparing
dc45ec6c902b: Preparing
3e4655a38876: Preparing
abbef7f88314: Preparing
ed6be5e2fd33: Preparing
1967fccdbe5e: Preparing
256f393e029f: Preparing
abbef7f88314: Waiting
ed6be5e2fd33: Waiting
1967fccdbe5e: Waiting
256f393e029f: Waiting
3e4655a38876: Waiting
e9a26559275d: Layer already exists
1704c5a3d8da: Layer already exists
dc45ec6c902b: Layer already exists
abbef7f88314: Layer already exists
3e4655a38876: Layer already exists
ed6be5e2fd33: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
b281c28906e9: Pushed
b587d4505b8d: Pushed
latest: digest: sha256:74f24b69add43022fe7edfa4dafb92384c8a07af27c8df1b197bf420d72297f1 size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
18ea5e11-1fc1-4a5e-86e4-b0c6d200729d  2025-10-15T12:39:29+00:00  1M22S     gs://cleanpro-site_cloudbuild/source/1760531969.125382-c70b44c3360c404ea0c4bd97a56aec5a.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision......................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00186-rd2] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
