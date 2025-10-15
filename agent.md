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
[32m✓ built in 2.14s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760535539.84136-a33e07ea9a4744ceb858f12d3c08d76c.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/f48bee38-d48f-4c10-81e3-9b4eb391b4dc].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/f48bee38-d48f-4c10-81e3-9b4eb391b4dc?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "f48bee38-d48f-4c10-81e3-9b4eb391b4dc"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760535539.84136-a33e07ea9a4744ceb858f12d3c08d76c.tgz#1760535558336201
Copying gs://cleanpro-site_cloudbuild/source/1760535539.84136-a33e07ea9a4744ceb858f12d3c08d76c.tgz#1760535558336201...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/19 : FROM node:20
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
Step 2/19 : WORKDIR /app/backend
 ---> Running in a017dc83834a
Removing intermediate container a017dc83834a
 ---> e64bf6421345
Step 3/19 : WORKDIR /app/backend
 ---> Running in 5787bf0a40d0
Removing intermediate container 5787bf0a40d0
 ---> 954482d619ea
Step 4/19 : COPY package*.json ./
 ---> de87ec5d2537
Step 5/19 : RUN npm install --omit=dev
 ---> Running in c12336e6c0f1
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
[0mRemoving intermediate container c12336e6c0f1
 ---> 9d3b5f274e8a
Step 6/19 : COPY . .
 ---> 3f7519c394b0
Step 7/19 : ENV PORT=8080
 ---> Running in a12311e5e26f
Removing intermediate container a12311e5e26f
 ---> ccffbf40d045
Step 8/19 : ENV HOST=0.0.0.0
 ---> Running in 18e96c9254d6
Removing intermediate container 18e96c9254d6
 ---> 54446553dcc5
Step 9/19 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in c424a3d40714
Removing intermediate container c424a3d40714
 ---> 16764999ef1d
Step 10/19 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ef57d64de5f3
Removing intermediate container ef57d64de5f3
 ---> ba972d27f173
Step 11/19 : EXPOSE 8080
 ---> Running in 6c0b0c6fb853
Removing intermediate container 6c0b0c6fb853
 ---> b930a7222035
Step 12/19 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in d957b03eecb1
Removing intermediate container d957b03eecb1
 ---> dfb298462066
Step 13/19 : CMD ["node", "index.js"]
 ---> Running in ad4f993e898a
Removing intermediate container ad4f993e898a
 ---> bbcb13e6988d
Step 14/19 : CMD ["node","index.js"]
 ---> Running in 2c28a30f5a17
Removing intermediate container 2c28a30f5a17
 ---> 596c3e390037
Step 15/19 : CMD ["node","index.js"]
 ---> Running in 1062b1d654e7
Removing intermediate container 1062b1d654e7
 ---> b974ea91a9c5
Step 16/19 : CMD ["node","index.js"]
 ---> Running in e5ad74864d0a
Removing intermediate container e5ad74864d0a
 ---> 69fed6d88893
Step 17/19 : CMD ["node","index.js"]
 ---> Running in 71eec2baa058
Removing intermediate container 71eec2baa058
 ---> 0e2a4276a51b
Step 18/19 : CMD ["node","index.js"]
 ---> Running in 02c5ee3158a0
Removing intermediate container 02c5ee3158a0
 ---> 724a2eefce7b
Step 19/19 : CMD ["node","index.js"]
 ---> Running in 5efe9cc8b7da
Removing intermediate container 5efe9cc8b7da
 ---> 446643e550d6
Successfully built 446643e550d6
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
b2d578fce2f6: Preparing
16a793e50f25: Preparing
d3534129c8a0: Preparing
b505f8560010: Preparing
bb9b55128ba0: Preparing
856b4ab3e742: Preparing
69368a71b175: Preparing
316cddb5fa75: Preparing
1bd72b149259: Preparing
060ee1077a8d: Preparing
3f1630e3667f: Preparing
3b385b8d2549: Preparing
69368a71b175: Waiting
316cddb5fa75: Waiting
856b4ab3e742: Waiting
1bd72b149259: Waiting
060ee1077a8d: Waiting
3f1630e3667f: Waiting
3b385b8d2549: Waiting
bb9b55128ba0: Layer already exists
856b4ab3e742: Layer already exists
b505f8560010: Pushed
d3534129c8a0: Pushed
69368a71b175: Layer already exists
060ee1077a8d: Layer already exists
316cddb5fa75: Layer already exists
1bd72b149259: Layer already exists
3b385b8d2549: Layer already exists
3f1630e3667f: Layer already exists
b2d578fce2f6: Pushed
16a793e50f25: Pushed
latest: digest: sha256:a12bb880b6ef93bad9245516e29f13b12d3d1a237da97fab66c7ddafadc59a68 size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                      IMAGES                                           STATUS
f48bee38-d48f-4c10-81e3-9b4eb391b4dc  2025-10-15T13:39:19+00:00  1M58S     gs://cleanpro-site_cloudbuild/source/1760535539.84136-a33e07ea9a4744ceb858f12d3c08d76c.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy............................done
Creating Revision................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00614-g5q' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00614-g5q&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00614-g5q%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/13.41.49.592948.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760535709.809349-9f103efcc15e45148a14166dd8b85ea5.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/71c49260-89ae-47f0-8200-b6d959cf4c8a].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/71c49260-89ae-47f0-8200-b6d959cf4c8a?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "71c49260-89ae-47f0-8200-b6d959cf4c8a"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760535709.809349-9f103efcc15e45148a14166dd8b85ea5.tgz#1760535710304559
Copying gs://cleanpro-site_cloudbuild/source/1760535709.809349-9f103efcc15e45148a14166dd8b85ea5.tgz#1760535710304559...
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
 ---> Running in d78a98df2d36
Removing intermediate container d78a98df2d36
 ---> 044ad8fc2728
Step 3/11 : COPY package*.json ./
 ---> 7ec7acd36a48
Step 4/11 : RUN npm install
 ---> Running in 3d8d29bb71e7

added 346 packages, and audited 347 packages in 32s

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
[0mRemoving intermediate container 3d8d29bb71e7
 ---> 1c174508e9e1
Step 5/11 : COPY . .
 ---> 4e89434cc3b7
Step 6/11 : RUN npm run build
 ---> Running in 420163b7b3e7

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
✓ built in 5.32s
Removing intermediate container 420163b7b3e7
 ---> 4cc52745b75e
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
03e63548f209: Download complete
621a51978ed7: Verifying Checksum
621a51978ed7: Download complete
f80aba050ead: Verifying Checksum
f80aba050ead: Download complete
f80aba050ead: Pull complete
621a51978ed7: Pull complete
03e63548f209: Pull complete
e2d0ea5d3690: Verifying Checksum
e2d0ea5d3690: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
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
 ---> 17e3872eea29
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> b8d6f5e6ad05
Step 10/11 : EXPOSE 8080
 ---> Running in 36e2e5bcc3a1
Removing intermediate container 36e2e5bcc3a1
 ---> 96c303dc2d70
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in c8d868d27adc
Removing intermediate container c8d868d27adc
 ---> ad0f37e60b93
Successfully built ad0f37e60b93
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
599ddfc6d410: Preparing
02be32e33556: Preparing
e9a26559275d: Preparing
1704c5a3d8da: Preparing
dc45ec6c902b: Preparing
3e4655a38876: Preparing
abbef7f88314: Preparing
ed6be5e2fd33: Preparing
1967fccdbe5e: Preparing
256f393e029f: Preparing
3e4655a38876: Waiting
abbef7f88314: Waiting
ed6be5e2fd33: Waiting
1967fccdbe5e: Waiting
256f393e029f: Waiting
e9a26559275d: Layer already exists
1704c5a3d8da: Layer already exists
dc45ec6c902b: Layer already exists
3e4655a38876: Layer already exists
ed6be5e2fd33: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
abbef7f88314: Layer already exists
02be32e33556: Pushed
599ddfc6d410: Pushed
latest: digest: sha256:408f1820eff2e6c89aefd409bc0800dc7882ba65e18f441bdb5a2822ea93b256 size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
71c49260-89ae-47f0-8200-b6d959cf4c8a  2025-10-15T13:41:50+00:00  1M24S     gs://cleanpro-site_cloudbuild/source/1760535709.809349-9f103efcc15e45148a14166dd8b85ea5.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.................done
Creating Revision...........................................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00191-lcs] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
