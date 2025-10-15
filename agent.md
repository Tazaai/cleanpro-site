## 🧭 Reading PROJECT_GUIDE.md context...
✅ Project guide loaded.
## 🔍 Validating base structure...
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

added 344 packages, and audited 345 packages in 17s

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
[32m✓ built in 1.94s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760540057.395153-6d882704eb2145d199712ba80dea6531.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/d97ce8a1-96a7-462c-980f-8cc3bff72884].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/d97ce8a1-96a7-462c-980f-8cc3bff72884?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "d97ce8a1-96a7-462c-980f-8cc3bff72884"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760540057.395153-6d882704eb2145d199712ba80dea6531.tgz#1760540076303038
Copying gs://cleanpro-site_cloudbuild/source/1760540057.395153-6d882704eb2145d199712ba80dea6531.tgz#1760540076303038...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/21 : FROM node:20
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
eaf2cbadb0df: Verifying Checksum
eaf2cbadb0df: Download complete
b44b21b18714: Pull complete
ae6f95508495: Verifying Checksum
ae6f95508495: Download complete
ae6f95508495: Pull complete
1b7f8e1ff922: Pull complete
eaf2cbadb0df: Pull complete
Digest: sha256:8cdc6b9b711af0711cc6139955cc1331fab5e0a995afd3260c52736fbc338059
Status: Downloaded newer image for node:20
 ---> f6f3cc67eec4
Step 2/21 : WORKDIR /app/backend
 ---> Running in 6e6f442009b2
Removing intermediate container 6e6f442009b2
 ---> 17e598055bd7
Step 3/21 : WORKDIR /app/backend
 ---> Running in 04799426ff51
Removing intermediate container 04799426ff51
 ---> f1fbe9acf132
Step 4/21 : COPY package*.json ./
 ---> e8e63219af47
Step 5/21 : RUN npm install --omit=dev
 ---> Running in 81fc51948309
[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 22s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 81fc51948309
 ---> bb29d43a9e6d
Step 6/21 : COPY . .
 ---> fc269abc09d8
Step 7/21 : ENV PORT=8080
 ---> Running in 87c5b6f86ca8
Removing intermediate container 87c5b6f86ca8
 ---> b693776ff261
Step 8/21 : ENV HOST=0.0.0.0
 ---> Running in aa73d3b4eb10
Removing intermediate container aa73d3b4eb10
 ---> 46143b2e2367
Step 9/21 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in cb8f4af10ee4
Removing intermediate container cb8f4af10ee4
 ---> 853309d04744
Step 10/21 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 3b87f1275bfb
Removing intermediate container 3b87f1275bfb
 ---> 4e5ec3ccb4ac
Step 11/21 : EXPOSE 8080
 ---> Running in 00d659681c9a
Removing intermediate container 00d659681c9a
 ---> 9e52b9793e3d
Step 12/21 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in 5bb7fad45a7b
Removing intermediate container 5bb7fad45a7b
 ---> 8d40cbc98039
Step 13/21 : CMD ["node", "index.js"]
 ---> Running in 3197c47e923a
Removing intermediate container 3197c47e923a
 ---> 7db98e668f3b
Step 14/21 : CMD ["node","index.js"]
 ---> Running in 00e6fa947bca
Removing intermediate container 00e6fa947bca
 ---> 9fb365df5f47
Step 15/21 : CMD ["node","index.js"]
 ---> Running in 5932bc3da5db
Removing intermediate container 5932bc3da5db
 ---> 60add469eae9
Step 16/21 : CMD ["node","index.js"]
 ---> Running in f1e1e749b9e1
Removing intermediate container f1e1e749b9e1
 ---> 4b9666f91834
Step 17/21 : CMD ["node","index.js"]
 ---> Running in a0b5c5ab4521
Removing intermediate container a0b5c5ab4521
 ---> 5e292cbb4a80
Step 18/21 : CMD ["node","index.js"]
 ---> Running in 85aeef47736e
Removing intermediate container 85aeef47736e
 ---> f4498c5f62c9
Step 19/21 : CMD ["node","index.js"]
 ---> Running in 79bfc62335a8
Removing intermediate container 79bfc62335a8
 ---> 177bba6d269e
Step 20/21 : CMD ["node","index.js"]
 ---> Running in 7aad60a15f9c
Removing intermediate container 7aad60a15f9c
 ---> c1a312f894e1
Step 21/21 : CMD ["node","index.js"]
 ---> Running in 32f2514fe23e
Removing intermediate container 32f2514fe23e
 ---> 1e6d4eeb84d8
Successfully built 1e6d4eeb84d8
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
72cea5876789: Preparing
64cecaddd938: Preparing
1a3a34e24540: Preparing
48bece1062fd: Preparing
bb9b55128ba0: Preparing
856b4ab3e742: Preparing
69368a71b175: Preparing
316cddb5fa75: Preparing
1bd72b149259: Preparing
060ee1077a8d: Preparing
3f1630e3667f: Preparing
3b385b8d2549: Preparing
856b4ab3e742: Waiting
69368a71b175: Waiting
316cddb5fa75: Waiting
1bd72b149259: Waiting
060ee1077a8d: Waiting
3f1630e3667f: Waiting
3b385b8d2549: Waiting
bb9b55128ba0: Layer already exists
856b4ab3e742: Layer already exists
69368a71b175: Layer already exists
1a3a34e24540: Pushed
48bece1062fd: Pushed
316cddb5fa75: Layer already exists
060ee1077a8d: Layer already exists
1bd72b149259: Layer already exists
3f1630e3667f: Layer already exists
3b385b8d2549: Layer already exists
72cea5876789: Pushed
64cecaddd938: Pushed
latest: digest: sha256:8a753bc36869a6111b146f2f56066b36a5c1398c09a73e5e44c4e7a40ab8e530 size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
d97ce8a1-96a7-462c-980f-8cc3bff72884  2025-10-15T14:54:36+00:00  1M55S     gs://cleanpro-site_cloudbuild/source/1760540057.395153-6d882704eb2145d199712ba80dea6531.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision.................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00616-62b' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00616-62b&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00616-62b%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/14.57.13.558939.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760540233.774007-8638570f83b74d18ac1b528bcc487fef.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/a687fe73-3b66-483c-a7ce-d503cbf6a2cf].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/a687fe73-3b66-483c-a7ce-d503cbf6a2cf?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "a687fe73-3b66-483c-a7ce-d503cbf6a2cf"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760540233.774007-8638570f83b74d18ac1b528bcc487fef.tgz#1760540234179353
Copying gs://cleanpro-site_cloudbuild/source/1760540233.774007-8638570f83b74d18ac1b528bcc487fef.tgz#1760540234179353...
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
 ---> Running in acc0ab25183a
Removing intermediate container acc0ab25183a
 ---> 411a8f48b1fc
Step 3/11 : COPY package*.json ./
 ---> 66ce52f54626
Step 4/11 : RUN npm install
 ---> Running in 7542a1ddeed6

added 346 packages, and audited 347 packages in 28s

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
[0mRemoving intermediate container 7542a1ddeed6
 ---> febf5d441f5c
Step 5/11 : COPY . .
 ---> 1b5de513fdce
Step 6/11 : RUN npm run build
 ---> Running in accd54b58f11

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
✓ built in 4.63s
Removing intermediate container accd54b58f11
 ---> 85056188f23b
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
03e63548f209: Download complete
621a51978ed7: Verifying Checksum
621a51978ed7: Download complete
f80aba050ead: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
f80aba050ead: Pull complete
e2d0ea5d3690: Download complete
621a51978ed7: Pull complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
03e63548f209: Pull complete
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
 ---> 1fc3e7ab4a90
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> adf4868a4a10
Step 10/11 : EXPOSE 8080
 ---> Running in 931b482d494a
Removing intermediate container 931b482d494a
 ---> 3398dea5a068
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in a8cd43b80194
Removing intermediate container a8cd43b80194
 ---> 29a303c62ccf
Successfully built 29a303c62ccf
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
4b02c0962a11: Preparing
efac2df1991c: Preparing
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
1704c5a3d8da: Layer already exists
e9a26559275d: Layer already exists
dc45ec6c902b: Layer already exists
abbef7f88314: Layer already exists
ed6be5e2fd33: Layer already exists
3e4655a38876: Layer already exists
1967fccdbe5e: Layer already exists
4b02c0962a11: Pushed
256f393e029f: Layer already exists
efac2df1991c: Pushed
latest: digest: sha256:1ea622797a763f57e0bde51e441ed4a741839222a07e868f17a87486af36951c size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
a687fe73-3b66-483c-a7ce-d503cbf6a2cf  2025-10-15T14:57:14+00:00  1M11S     gs://cleanpro-site_cloudbuild/source/1760540233.774007-8638570f83b74d18ac1b528bcc487fef.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.......................done
Creating Revision......................................................................................................................................................................................................................................................................................................................................................................................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00193-gvt] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
[main f43ddf9] chore(codox): automated review & deploy report
 1 file changed, 404 insertions(+), 3 deletions(-)
To https://github.com/Tazaai/cleanpro-site
   a587ce0..f43ddf9  main -> main
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
⚠️ Git rebase failed — showing conflicts...
❌ Codox run detected issues — review agent.md
