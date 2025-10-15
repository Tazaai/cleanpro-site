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

added 344 packages, and audited 345 packages in 15s

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
[32m✓ built in 2.10s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760533489.030634-64bd35ddbf9540c09eb46809956de25d.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/e4e896e5-f321-448a-b981-1734ec978b59].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/e4e896e5-f321-448a-b981-1734ec978b59?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "e4e896e5-f321-448a-b981-1734ec978b59"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760533489.030634-64bd35ddbf9540c09eb46809956de25d.tgz#1760533507072065
Copying gs://cleanpro-site_cloudbuild/source/1760533489.030634-64bd35ddbf9540c09eb46809956de25d.tgz#1760533507072065...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/16 : FROM node:20
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
b44b21b18714: Verifying Checksum
b44b21b18714: Download complete
1b7f8e1ff922: Verifying Checksum
1b7f8e1ff922: Download complete
b44b21b18714: Pull complete
ae6f95508495: Verifying Checksum
ae6f95508495: Download complete
eaf2cbadb0df: Verifying Checksum
eaf2cbadb0df: Download complete
ae6f95508495: Pull complete
1b7f8e1ff922: Pull complete
eaf2cbadb0df: Pull complete
Digest: sha256:8cdc6b9b711af0711cc6139955cc1331fab5e0a995afd3260c52736fbc338059
Status: Downloaded newer image for node:20
 ---> f6f3cc67eec4
Step 2/16 : WORKDIR /app/backend
 ---> Running in 2f55be3dc75c
Removing intermediate container 2f55be3dc75c
 ---> 6391d78e66ae
Step 3/16 : WORKDIR /app/backend
 ---> Running in bd7476828c68
Removing intermediate container bd7476828c68
 ---> 6009bff1f05b
Step 4/16 : COPY package*.json ./
 ---> ed7df3faf745
Step 5/16 : RUN npm install --omit=dev
 ---> Running in c1e1c09ecb86
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
[0mRemoving intermediate container c1e1c09ecb86
 ---> c981ef41c830
Step 6/16 : COPY . .
 ---> a14f40b8c863
Step 7/16 : ENV PORT=8080
 ---> Running in 991d27b028a9
Removing intermediate container 991d27b028a9
 ---> d14e87857bb9
Step 8/16 : ENV HOST=0.0.0.0
 ---> Running in ae5e7ff9ba40
Removing intermediate container ae5e7ff9ba40
 ---> 397b67ece964
Step 9/16 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d62ae069dd85
Removing intermediate container d62ae069dd85
 ---> 56d17254ce27
Step 10/16 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 5904fc932cac
Removing intermediate container 5904fc932cac
 ---> 05b56d2a05a0
Step 11/16 : EXPOSE 8080
 ---> Running in 867678e980db
Removing intermediate container 867678e980db
 ---> b5c1f78c6ebf
Step 12/16 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in 2be6c27f1855
Removing intermediate container 2be6c27f1855
 ---> f2da193e5e88
Step 13/16 : CMD ["node", "index.js"]
 ---> Running in f282fc2f627b
Removing intermediate container f282fc2f627b
 ---> e9017fad45ae
Step 14/16 : CMD ["node","index.js"]
 ---> Running in 0174670269c5
Removing intermediate container 0174670269c5
 ---> b79730551b23
Step 15/16 : CMD ["node","index.js"]
 ---> Running in 32fc8715ca36
Removing intermediate container 32fc8715ca36
 ---> 04ee092db42a
Step 16/16 : CMD ["node","index.js"]
 ---> Running in 7ae14829b50a
Removing intermediate container 7ae14829b50a
 ---> 4987ca8dab69
Successfully built 4987ca8dab69
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
7eef442dcce2: Preparing
cd5d790f51ca: Preparing
8861984d676d: Preparing
3deb116e2177: Preparing
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
060ee1077a8d: Waiting
3f1630e3667f: Waiting
3b385b8d2549: Waiting
856b4ab3e742: Waiting
69368a71b175: Waiting
bb9b55128ba0: Layer already exists
856b4ab3e742: Layer already exists
8861984d676d: Pushed
3deb116e2177: Pushed
69368a71b175: Layer already exists
1bd72b149259: Layer already exists
060ee1077a8d: Layer already exists
316cddb5fa75: Layer already exists
3b385b8d2549: Layer already exists
3f1630e3667f: Layer already exists
7eef442dcce2: Pushed
cd5d790f51ca: Pushed
latest: digest: sha256:b2230bf422c25be96e0bdffb72016e3e559ebfa6df4e0451ca7c9f816680e09c size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
e4e896e5-f321-448a-b981-1734ec978b59  2025-10-15T13:05:07+00:00  2M2S      gs://cleanpro-site_cloudbuild/source/1760533489.030634-64bd35ddbf9540c09eb46809956de25d.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision.............................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00611-6ql&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00611-6ql%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/13.07.41.615548.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760533661.804516-0c6da2ce1a8346de81bf9bf864b67d74.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/6c170f16-1ae0-4ff5-8a25-9f9dbed13a77].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/6c170f16-1ae0-4ff5-8a25-9f9dbed13a77?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "6c170f16-1ae0-4ff5-8a25-9f9dbed13a77"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760533661.804516-0c6da2ce1a8346de81bf9bf864b67d74.tgz#1760533662231652
Copying gs://cleanpro-site_cloudbuild/source/1760533661.804516-0c6da2ce1a8346de81bf9bf864b67d74.tgz#1760533662231652...
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
f2fbe8556258: Verifying Checksum
f2fbe8556258: Download complete
c74c90aa7c87: Verifying Checksum
c74c90aa7c87: Download complete
c087321cece4: Verifying Checksum
c087321cece4: Download complete
c087321cece4: Pull complete
f2fbe8556258: Pull complete
c74c90aa7c87: Pull complete
Digest: sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
Status: Downloaded newer image for node:20-alpine
 ---> 30c8b6e55a5d
Step 2/11 : WORKDIR /app
 ---> Running in b5ecc4b9420a
Removing intermediate container b5ecc4b9420a
 ---> 9300458f3534
Step 3/11 : COPY package*.json ./
 ---> 7d65b785ec23
Step 4/11 : RUN npm install
 ---> Running in d83f9f057044

added 346 packages, and audited 347 packages in 31s

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
[0mRemoving intermediate container d83f9f057044
 ---> 07595c02d5ab
Step 5/11 : COPY . .
 ---> e10423a0331c
Step 6/11 : RUN npm run build
 ---> Running in cfc9521db64d

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
✓ built in 5.44s
Removing intermediate container cfc9521db64d
 ---> 68d8b18176fa
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
f80aba050ead: Download complete
621a51978ed7: Verifying Checksum
621a51978ed7: Download complete
03e63548f209: Verifying Checksum
03e63548f209: Download complete
f80aba050ead: Pull complete
621a51978ed7: Pull complete
03e63548f209: Pull complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
e2d0ea5d3690: Verifying Checksum
e2d0ea5d3690: Download complete
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
 ---> d0a91372ae64
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 252432cb9a72
Step 10/11 : EXPOSE 8080
 ---> Running in a7cbd9166f08
Removing intermediate container a7cbd9166f08
 ---> 1cf6d29a280a
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in 5d0af044a8c6
Removing intermediate container 5d0af044a8c6
 ---> db83ab6cd10d
Successfully built db83ab6cd10d
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
046d3e9f228c: Preparing
124a046d6457: Preparing
e9a26559275d: Preparing
1704c5a3d8da: Preparing
dc45ec6c902b: Preparing
3e4655a38876: Preparing
abbef7f88314: Preparing
ed6be5e2fd33: Preparing
1967fccdbe5e: Preparing
256f393e029f: Preparing
3e4655a38876: Waiting
ed6be5e2fd33: Waiting
1967fccdbe5e: Waiting
256f393e029f: Waiting
abbef7f88314: Waiting
1704c5a3d8da: Layer already exists
dc45ec6c902b: Layer already exists
e9a26559275d: Layer already exists
ed6be5e2fd33: Layer already exists
3e4655a38876: Layer already exists
abbef7f88314: Layer already exists
1967fccdbe5e: Layer already exists
046d3e9f228c: Pushed
256f393e029f: Layer already exists
124a046d6457: Pushed
latest: digest: sha256:05dc8f5aca584823ba78419d1dd3e928319f0f10969acc6cca950bb9dd7b1cfa size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
6c170f16-1ae0-4ff5-8a25-9f9dbed13a77  2025-10-15T13:07:42+00:00  1M22S     gs://cleanpro-site_cloudbuild/source/1760533661.804516-0c6da2ce1a8346de81bf9bf864b67d74.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy............................done
Creating Revision.................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00188-rhh] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
