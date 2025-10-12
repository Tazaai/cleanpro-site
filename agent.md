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
## 📦 Auto-installing missing backend packages

added 72 packages, and audited 346 packages in 7s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
## 🔥 Firebase Admin init check
## 🎨 Checking frontend API_BASE default
## 🎨 Checking frontend

up to date, audited 272 packages in 735ms

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
[32m✓ built in 1.95s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760269093.184543-6ccff1a8b1344edaa2ee56df5e440d0d.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/c111ecec-667a-46a1-9f43-c1bc230f35a1].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/c111ecec-667a-46a1-9f43-c1bc230f35a1?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "c111ecec-667a-46a1-9f43-c1bc230f35a1"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760269093.184543-6ccff1a8b1344edaa2ee56df5e440d0d.tgz#1760269118854745
Copying gs://cleanpro-site_cloudbuild/source/1760269093.184543-6ccff1a8b1344edaa2ee56df5e440d0d.tgz#1760269118854745...
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
 ---> Running in 04f48996bf55
Removing intermediate container 04f48996bf55
 ---> 15850ef4aeae
Step 3/14 : COPY package*.json ./
 ---> 4f37118a67fe
Step 4/14 : RUN npm install --production
 ---> Running in d65438b3b876
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 20s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container d65438b3b876
 ---> 357d16b17fb8
Step 5/14 : COPY . .
 ---> 014f67c4de2e
Step 6/14 : ENV PORT=8080
 ---> Running in 1ebbc9b3145c
Removing intermediate container 1ebbc9b3145c
 ---> 06f5f66ce862
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ec4a994de71e
Removing intermediate container ec4a994de71e
 ---> 6db87589d92b
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in fa89d0f13b16
Removing intermediate container fa89d0f13b16
 ---> 5d79f73ae3a4
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in fe52adb0ab3e
Removing intermediate container fe52adb0ab3e
 ---> f6e714dd7bea
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9b1d9034666f
Removing intermediate container 9b1d9034666f
 ---> ca197f23f4d3
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 9cfed7ac7e3b
Removing intermediate container 9cfed7ac7e3b
 ---> 086596fb7722
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 831783db3186
Removing intermediate container 831783db3186
 ---> 2edf0c30b679
Step 13/14 : EXPOSE 8080
 ---> Running in ef1e35235a30
Removing intermediate container ef1e35235a30
 ---> 889957d1b953
Step 14/14 : CMD ["npm","start"]
 ---> Running in aef7bd1a5fde
Removing intermediate container aef7bd1a5fde
 ---> 934ef227be08
Successfully built 934ef227be08
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
b11bc2c5eee9: Preparing
d16c53ade30d: Preparing
7976fccde166: Preparing
fd212db188da: Preparing
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
fd212db188da: Pushed
7976fccde166: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
b11bc2c5eee9: Pushed
d16c53ade30d: Pushed
latest: digest: sha256:7536e1ac3265641e41eb473a013c2b0b3ed7960baf0e579e2f1d0cc2af70f8d5 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
c111ecec-667a-46a1-9f43-c1bc230f35a1  2025-10-12T11:38:39+00:00  2M4S      gs://cleanpro-site_cloudbuild/source/1760269093.184543-6ccff1a8b1344edaa2ee56df5e440d0d.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision...........................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00493-cp6' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00493-cp6&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00493-cp6%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760269281.121505-bdce5aaa62ca479cb1b10c44f2102181.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/171db7ed-2acb-4ee0-ba5f-22f18e8b7a09].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/171db7ed-2acb-4ee0-ba5f-22f18e8b7a09?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "171db7ed-2acb-4ee0-ba5f-22f18e8b7a09"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760269281.121505-bdce5aaa62ca479cb1b10c44f2102181.tgz#1760269307361967
Copying gs://cleanpro-site_cloudbuild/source/1760269281.121505-bdce5aaa62ca479cb1b10c44f2102181.tgz#1760269307361967...
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
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
cc663995c53d: Verifying Checksum
cc663995c53d: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
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
 ---> Running in bced6ca9201b
Removing intermediate container bced6ca9201b
 ---> 76a87d1c8887
Step 3/14 : COPY package*.json ./
 ---> 48332ef44844
Step 4/14 : RUN npm install --production
 ---> Running in 43e97594de00
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 20s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 43e97594de00
 ---> a83d7d9f3cd7
Step 5/14 : COPY . .
 ---> 7a920f955dc7
Step 6/14 : ENV PORT=8080
 ---> Running in fb6b3aabfdde
Removing intermediate container fb6b3aabfdde
 ---> b7964cc51621
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2e66b05906cc
Removing intermediate container 2e66b05906cc
 ---> 42ac7a14a681
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 46ac72a92bf7
Removing intermediate container 46ac72a92bf7
 ---> 93b1c38309db
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 24cc99e351a2
Removing intermediate container 24cc99e351a2
 ---> a466c85b447c
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9fa17c82bbf0
Removing intermediate container 9fa17c82bbf0
 ---> 9d56655ac7ff
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 8c2b2376f288
Removing intermediate container 8c2b2376f288
 ---> 9c53c4b24ad8
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in c0a77fbf5283
Removing intermediate container c0a77fbf5283
 ---> 7af485441148
Step 13/14 : EXPOSE 8080
 ---> Running in b2344ee177f9
Removing intermediate container b2344ee177f9
 ---> 9a19d30f4244
Step 14/14 : CMD ["npm","start"]
 ---> Running in 7c2a463abe8b
Removing intermediate container 7c2a463abe8b
 ---> e4b0c8bc246d
Successfully built e4b0c8bc246d
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
81a82c874016: Preparing
4248002460a1: Preparing
c89ec6d9052f: Preparing
4aec52603a9d: Preparing
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
4aec52603a9d: Pushed
8ee6722b9ed5: Layer already exists
c89ec6d9052f: Pushed
aca836066730: Layer already exists
81a82c874016: Pushed
4248002460a1: Pushed
latest: digest: sha256:4fb657591cc52a546118c72691ec8f90c2989e8d60d73280e8d63496f450a78d size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
171db7ed-2acb-4ee0-ba5f-22f18e8b7a09  2025-10-12T11:41:47+00:00  1M58S     gs://cleanpro-site_cloudbuild/source/1760269281.121505-bdce5aaa62ca479cb1b10c44f2102181.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy........................done
Creating Revision...........................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00494-6gr' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00494-6gr&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00494-6gr%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760269463.295337-7eec74d888c84384b7e1a978a8473359.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/bc68ce65-b72b-4e17-be85-5b775bee19ac].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/bc68ce65-b72b-4e17-be85-5b775bee19ac?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "bc68ce65-b72b-4e17-be85-5b775bee19ac"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760269463.295337-7eec74d888c84384b7e1a978a8473359.tgz#1760269489615780
Copying gs://cleanpro-site_cloudbuild/source/1760269463.295337-7eec74d888c84384b7e1a978a8473359.tgz#1760269489615780...
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
 ---> Running in b286b2ef5594
Removing intermediate container b286b2ef5594
 ---> bfd2f12f8ed0
Step 3/14 : COPY package*.json ./
 ---> 0966f5040bc4
Step 4/14 : RUN npm install --production
 ---> Running in 5b4b79950dbf
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
[0mRemoving intermediate container 5b4b79950dbf
 ---> 11ae6a0df45f
Step 5/14 : COPY . .
 ---> bdfac220a9a4
Step 6/14 : ENV PORT=8080
 ---> Running in 74b3d479cb02
Removing intermediate container 74b3d479cb02
 ---> 83a01eff30c4
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b8d1accda5b0
Removing intermediate container b8d1accda5b0
 ---> 7ba84cd2e533
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in dd1711846de6
Removing intermediate container dd1711846de6
 ---> 1b09cd51d420
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 263bce193128
Removing intermediate container 263bce193128
 ---> 1be2cbf889ce
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 8501f4c21ad2
Removing intermediate container 8501f4c21ad2
 ---> 347b3a6a1d42
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in f94473596a2f
Removing intermediate container f94473596a2f
 ---> 156f2a0c0335
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 603f95fd942e
Removing intermediate container 603f95fd942e
 ---> b3a932884204
Step 13/14 : EXPOSE 8080
 ---> Running in 2a48ed10bb1e
Removing intermediate container 2a48ed10bb1e
 ---> 62b209f78aa4
Step 14/14 : CMD ["npm","start"]
 ---> Running in 955e265686f1
Removing intermediate container 955e265686f1
 ---> 6b38ab9d1ebe
Successfully built 6b38ab9d1ebe
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
74f84fdd1445: Preparing
56af4a51d5dd: Preparing
95c1a45d980b: Preparing
a6f93b64557b: Preparing
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
95c1a45d980b: Pushed
7ace34a4ad78: Layer already exists
a6f93b64557b: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
74f84fdd1445: Pushed
56af4a51d5dd: Pushed
latest: digest: sha256:5233546db52c46171d30800bb1056e290fea3b0cd53d413d5ad87e38e4f5c088 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
bc68ce65-b72b-4e17-be85-5b775bee19ac  2025-10-12T11:44:49+00:00  1M60S     gs://cleanpro-site_cloudbuild/source/1760269463.295337-7eec74d888c84384b7e1a978a8473359.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.........................done
Creating Revision...................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00495-5gc' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00495-5gc&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00495-5gc%22 
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
