## ## Reading PROJECT_GUIDE.md for context...
## 🔧 Ensuring firebase_config.json exists in all paths
skip firebase_config.json in local context
🩹 Created missing ./backend/firebase_config.json
skip firebase_config.json in local context
🩹 Created missing /app/firebase_config.json
## 🧩 Auto-healing project structure from PROJECT_GUIDE.md
## 🔑 Checking required secrets
✅ GOOGLE_MAPS_API_KEY present
✅ GCP_PROJECT present
✅ GCP_SA_KEY present
✅ FIREBASE_KEY present
## ## Validating project structure
✅ Structure verified.
## 🐳 Checking backend/Dockerfile
✅ Dockerfile ready.
## 🧠 Checking backend routes
✅ services_api present
✅ bookings_api present
✅ quotes_api present
✅ pricing_api present
✅ calendar_api present
✅ coordination_points_api present
✅ config_api present
✅ Route check complete.
## �� Auto-installing missing backend packages

added 72 packages, and audited 346 packages in 8s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
## 🔥 Firebase Admin init check
## 🎨 Checking frontend API_BASE default
## 🎨 Checking frontend

up to date, audited 272 packages in 675ms

42 packages are looking for funding
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
[32m✓ built in 1.99s[39m
## 🗄️ Checking Firebase structure
node:internal/modules/esm/resolve:873
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'firebase-admin' imported from /home/runner/work/cleanpro-site/cleanpro-site/[eval1]
    at packageResolve (node:internal/modules/esm/resolve:873:9)
    at moduleResolve (node:internal/modules/esm/resolve:946:18)
    at defaultResolve (node:internal/modules/esm/resolve:1188:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:708:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:657:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:640:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:264:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:168:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v20.19.5
🧩 Synced firebase_config.json to root and /app/
## ☁️ Deploy & log review
🧠 Attempt 1/3
[33m-[39m Cloning the repository...
[32m✔[39m Repository cloned successfully
run cd fix && pnpm install && pnpm dev
Happy Coding! 💻
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760298623.481843-b40c4e3c1f074d48b3e19decbf7d8d49.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/3b64e9f2-75b2-481e-9449-f508feda59ee].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/3b64e9f2-75b2-481e-9449-f508feda59ee?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "3b64e9f2-75b2-481e-9449-f508feda59ee"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760298623.481843-b40c4e3c1f074d48b3e19decbf7d8d49.tgz#1760298650253899
Copying gs://cleanpro-site_cloudbuild/source/1760298623.481843-b40c4e3c1f074d48b3e19decbf7d8d49.tgz#1760298650253899...
/ [0 files][    0.0 B/ 29.3 MiB]                                                / [1 files][ 29.3 MiB/ 29.3 MiB]                                                
Operation completed over 1 objects/29.3 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    223MB
Step 1/14 : FROM node:20-slim
20-slim: Pulling from library/node
5c32499ab806: Pulling fs layer
c236995d12f2: Pulling fs layer
ab9c5ae25e4d: Pulling fs layer
997b350cffa1: Pulling fs layer
cc663995c53d: Pulling fs layer
997b350cffa1: Waiting
cc663995c53d: Waiting
c236995d12f2: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in ae0896fe9f5c
Removing intermediate container ae0896fe9f5c
 ---> fd81d1a659bb
Step 3/14 : COPY package*.json ./
 ---> eccf0c33a9c1
Step 4/14 : RUN npm install --production
 ---> Running in 45f964cfd50e
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 19s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 45f964cfd50e
 ---> c0f48f9322c9
Step 5/14 : COPY . .
 ---> f4949a4f0d6b
Step 6/14 : ENV PORT=8080
 ---> Running in fe307cd8f6d1
Removing intermediate container fe307cd8f6d1
 ---> 657350727c93
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 71eb30abf9de
Removing intermediate container 71eb30abf9de
 ---> a4a7581018f4
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ba08dd25577f
Removing intermediate container ba08dd25577f
 ---> be28019211dc
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b298ac307c84
Removing intermediate container b298ac307c84
 ---> f1383abd9182
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 34f26c52b20b
Removing intermediate container 34f26c52b20b
 ---> 41dadfadd97b
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 52401f7bf13c
Removing intermediate container 52401f7bf13c
 ---> 5beee9c6c973
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 1b2c8a42f5e2
Removing intermediate container 1b2c8a42f5e2
 ---> 0fdf2e655c2d
Step 13/14 : EXPOSE 8080
 ---> Running in cf1b06926165
Removing intermediate container cf1b06926165
 ---> 51ca6a4a3d1a
Step 14/14 : CMD ["npm","start"]
 ---> Running in 063df3498f4b
Removing intermediate container 063df3498f4b
 ---> 6a5a8da7f8a2
Successfully built 6a5a8da7f8a2
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
00c6c8757039: Preparing
d1f2ee87ec28: Preparing
2fc0c6ad1a55: Preparing
b59a4c9a3476: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
e07dd166a3a3: Waiting
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
b59a4c9a3476: Pushed
8ee6722b9ed5: Layer already exists
2fc0c6ad1a55: Pushed
aca836066730: Layer already exists
00c6c8757039: Pushed
d1f2ee87ec28: Pushed
latest: digest: sha256:87451a26ecdb45a71de2262ba224bdc34d92f3a8bafab655d080f5530a24a395 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
3b64e9f2-75b2-481e-9449-f508feda59ee  2025-10-12T19:50:50+00:00  1M60S     gs://cleanpro-site_cloudbuild/source/1760298623.481843-b40c4e3c1f074d48b3e19decbf7d8d49.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..............................done
Creating Revision..................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00516-tzv' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00516-tzv&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00516-tzv%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760298822.026441-5583f202f6b742408261650fc8b365db.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/efde11c1-deb2-485e-99fe-ec667ce41a85].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/efde11c1-deb2-485e-99fe-ec667ce41a85?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "efde11c1-deb2-485e-99fe-ec667ce41a85"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760298822.026441-5583f202f6b742408261650fc8b365db.tgz#1760298848469070
Copying gs://cleanpro-site_cloudbuild/source/1760298822.026441-5583f202f6b742408261650fc8b365db.tgz#1760298848469070...
/ [0 files][    0.0 B/ 29.3 MiB]                                                / [1 files][ 29.3 MiB/ 29.3 MiB]                                                
Operation completed over 1 objects/29.3 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    223MB
Step 1/14 : FROM node:20-slim
20-slim: Pulling from library/node
5c32499ab806: Pulling fs layer
c236995d12f2: Pulling fs layer
ab9c5ae25e4d: Pulling fs layer
997b350cffa1: Pulling fs layer
cc663995c53d: Pulling fs layer
997b350cffa1: Waiting
cc663995c53d: Waiting
c236995d12f2: Verifying Checksum
c236995d12f2: Download complete
997b350cffa1: Download complete
5c32499ab806: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in 14f593cd79b9
Removing intermediate container 14f593cd79b9
 ---> d5f3d23fa126
Step 3/14 : COPY package*.json ./
 ---> 1def3c0b828c
Step 4/14 : RUN npm install --production
 ---> Running in cbdc1ba29d21
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 19s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container cbdc1ba29d21
 ---> 5a8c480615ea
Step 5/14 : COPY . .
 ---> 0d158f73ce30
Step 6/14 : ENV PORT=8080
 ---> Running in 7e0018669c91
Removing intermediate container 7e0018669c91
 ---> dd98f0ff8cd6
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 21bf2b759376
Removing intermediate container 21bf2b759376
 ---> 355dd82255b3
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in f4deb53b5cce
Removing intermediate container f4deb53b5cce
 ---> 67fbf3bcad9f
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4f0592ee2e55
Removing intermediate container 4f0592ee2e55
 ---> d8004172292b
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in c7b899be8d21
Removing intermediate container c7b899be8d21
 ---> 50140ee91f47
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 5a361fad4b13
Removing intermediate container 5a361fad4b13
 ---> 7d36f172a8d4
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3ce3e0ac1e05
Removing intermediate container 3ce3e0ac1e05
 ---> 7e6aa87a33f4
Step 13/14 : EXPOSE 8080
 ---> Running in 799ae6fc89f5
Removing intermediate container 799ae6fc89f5
 ---> cc17f4bec58f
Step 14/14 : CMD ["npm","start"]
 ---> Running in d7f393d28c9d
Removing intermediate container d7f393d28c9d
 ---> 3b184a14eea8
Successfully built 3b184a14eea8
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
ae25cca1c3b2: Preparing
72180ac5692b: Preparing
31d2a7d5d5c0: Preparing
23da92c936d4: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
e07dd166a3a3: Waiting
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
31d2a7d5d5c0: Pushed
8ee6722b9ed5: Layer already exists
23da92c936d4: Pushed
aca836066730: Layer already exists
ae25cca1c3b2: Pushed
72180ac5692b: Pushed
latest: digest: sha256:8f12155205406a4b5121b300c0e7109df336b91a03edfd9d3f58a2b4670deb97 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
efde11c1-deb2-485e-99fe-ec667ce41a85  2025-10-12T19:54:08+00:00  1M52S     gs://cleanpro-site_cloudbuild/source/1760298822.026441-5583f202f6b742408261650fc8b365db.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...............................done
Creating Revision.................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00517-s5d' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00517-s5d&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00517-s5d%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760299014.844447-c0fdf1dae11e42daa19b8f364e7576cd.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/83bc8010-ab15-43f4-86a6-d53041f6266e].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/83bc8010-ab15-43f4-86a6-d53041f6266e?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "83bc8010-ab15-43f4-86a6-d53041f6266e"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760299014.844447-c0fdf1dae11e42daa19b8f364e7576cd.tgz#1760299041300415
Copying gs://cleanpro-site_cloudbuild/source/1760299014.844447-c0fdf1dae11e42daa19b8f364e7576cd.tgz#1760299041300415...
/ [0 files][    0.0 B/ 29.3 MiB]                                                -- [1 files][ 29.3 MiB/ 29.3 MiB]                                                
Operation completed over 1 objects/29.3 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    223MB
Step 1/14 : FROM node:20-slim
20-slim: Pulling from library/node
5c32499ab806: Pulling fs layer
c236995d12f2: Pulling fs layer
ab9c5ae25e4d: Pulling fs layer
997b350cffa1: Pulling fs layer
cc663995c53d: Pulling fs layer
997b350cffa1: Waiting
cc663995c53d: Waiting
c236995d12f2: Verifying Checksum
c236995d12f2: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
5c32499ab806: Pull complete
c236995d12f2: Pull complete
ab9c5ae25e4d: Pull complete
997b350cffa1: Pull complete
cc663995c53d: Pull complete
Digest: sha256:f679d7699517426eb148a5698c717477fd3f8a48f6c1eaf771e390a9bb8268c8
Status: Downloaded newer image for node:20-slim
 ---> 66044c209f92
Step 2/14 : WORKDIR /app/backend
 ---> Running in 84ed58ca5ab6
Removing intermediate container 84ed58ca5ab6
 ---> e5534db4a22e
Step 3/14 : COPY package*.json ./
 ---> 6b1bfe613a5e
Step 4/14 : RUN npm install --production
 ---> Running in 12837bcf7d4e
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
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
[0mRemoving intermediate container 12837bcf7d4e
 ---> c33880c9f188
Step 5/14 : COPY . .
 ---> 50fd2dea0edc
Step 6/14 : ENV PORT=8080
 ---> Running in 59b016335817
Removing intermediate container 59b016335817
 ---> c5038069fa08
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 662af398d5a8
Removing intermediate container 662af398d5a8
 ---> 69e63e58fd6a
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in c3f2da3579ef
Removing intermediate container c3f2da3579ef
 ---> eee515f1d767
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7c53d6b4ec9e
Removing intermediate container 7c53d6b4ec9e
 ---> 630660682625
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ffdefbc20e5b
Removing intermediate container ffdefbc20e5b
 ---> 8992a432fc7d
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 618ff274714e
Removing intermediate container 618ff274714e
 ---> c2cec8123400
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 66c916148f7d
Removing intermediate container 66c916148f7d
 ---> 8984f5c4d9f4
Step 13/14 : EXPOSE 8080
 ---> Running in 5be8163311db
Removing intermediate container 5be8163311db
 ---> de2264579586
Step 14/14 : CMD ["npm","start"]
 ---> Running in cb8b1587d564
Removing intermediate container cb8b1587d564
 ---> c039d015631f
Successfully built c039d015631f
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
0e473482c271: Preparing
44a28ac8a969: Preparing
3a88942bb6b0: Preparing
d226cb7b3100: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
e07dd166a3a3: Waiting
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
d226cb7b3100: Pushed
3a88942bb6b0: Pushed
aca836066730: Layer already exists
8ee6722b9ed5: Layer already exists
0e473482c271: Pushed
44a28ac8a969: Pushed
latest: digest: sha256:1db39feb3dda74c7abd5227c34da946dc0f9c8c957a02ad8d4a904115969bb8e size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
83bc8010-ab15-43f4-86a6-d53041f6266e  2025-10-12T19:57:21+00:00  2M3S      gs://cleanpro-site_cloudbuild/source/1760299014.844447-c0fdf1dae11e42daa19b8f364e7576cd.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..............................done
Creating Revision...................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00518-rln' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00518-rln&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00518-rln%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 3 failed — reading Cloud Run logs...
## 🧪 Running backend & frontend tests
Testing backend at: https://cleanpro-backend-5539254765.europe-west1.run.app

=== Health check ===
✅ CleanPro Backend is running (HTTP 200)

=== Services ===
{"ok":true,"services":[{"id":"residential_cleaning","name":"Residential Cleaning"},{"id":"deep_cleaning","name":"Deep Cleaning"},{"id":"office_cleaning","name":"Office Cleaning"},{"id":"move_inout_cleaning","name":"Move In/Out Cleaning"}]} (HTTP 200)

=== Pricing ===
{"ok":true,"pricing":{"residential_cleaning":{"pricePerM2":1.8,"weeklyDiscount":0.1,"monthlyDiscount":0.05},"deep_cleaning":{"pricePerM2":2.5,"weeklyDiscount":0.05,"monthlyDiscount":0.02},"office_cleaning":{"pricePerM2":2,"weeklyDiscount":0.08,"monthlyDiscount":0.03}}} (HTTP 200)

=== Calendar ===
{"ok":false,"error":"Calendar fetch failed"} (HTTP 500)

=== Maps distance ===
{"destination_addresses":[],"error_message":"The provided API key is expired. ","origin_addresses":[],"rows":[],"status":"REQUEST_DENIED"} (HTTP 200)

=== Google Calendar ===
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/gcalendar</pre>
</body>
</html>
 (HTTP 404)

=== HQs ===
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /api/hqs</pre>
</body>
</html>
 (HTTP 404)

Testing frontend at: https://cleanpro-frontend-5539254765.europe-west1.run.app

=== Route / ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/ → (HTTP 200)

=== Route /booking ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/booking → (HTTP 200)

=== Route /contact ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/contact → (HTTP 200)

=== Route /about ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/about → (HTTP 200)

=== Assets (auto-detected) ===
assets/index-39fedcd9.css → (HTTP 200)
assets/index-b4cf7e65.js → (HTTP 200)

=== Broken links check (homepage only) ===
https://cleanpro-frontend-5539254765.europe-west1.run.app/assets/index-39fedcd9.css → (HTTP 200)
https://cleanpro-frontend-5539254765.europe-west1.run.app/vite.svg → (HTTP 200)

=== API base check ===

=== Homepage snippet ===
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clean Departure</title>

    <!-- Material Design Lite (optional styling) -->
    <link
      rel="stylesheet"
      href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"
    />
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script type="module" crossorigin src="/assets/index-b4cf7e65.js"></script>
    <link rel="stylesheet" href="/assets/index-39fedcd9.css">
  </head>
  <body>
    <div id="root"></div>
    

=== Browser console errors/warnings ===
node:internal/modules/esm/resolve:873
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'puppeteer' imported from /home/runner/work/cleanpro-site/cleanpro-site/[eval1]
    at packageResolve (node:internal/modules/esm/resolve:873:9)
    at moduleResolve (node:internal/modules/esm/resolve:946:18)
    at defaultResolve (node:internal/modules/esm/resolve:1188:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:708:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:657:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:640:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:264:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:168:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v20.19.5
❌ Frontend tests failed
