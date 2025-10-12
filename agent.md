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

added 72 packages, and audited 346 packages in 7s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
## 🔥 Firebase Admin init check
## 🎨 Checking frontend API_BASE default
## 🎨 Checking frontend

up to date, audited 272 packages in 758ms

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
[32m✓ built in 1.98s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760294336.152734-0df6116d625d43c88232185fcc16b3a5.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/73407823-2ba9-4aa7-91b7-e6276d2ac714].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/73407823-2ba9-4aa7-91b7-e6276d2ac714?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "73407823-2ba9-4aa7-91b7-e6276d2ac714"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760294336.152734-0df6116d625d43c88232185fcc16b3a5.tgz#1760294362293374
Copying gs://cleanpro-site_cloudbuild/source/1760294336.152734-0df6116d625d43c88232185fcc16b3a5.tgz#1760294362293374...
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
 ---> Running in 5fe7ecad848a
Removing intermediate container 5fe7ecad848a
 ---> 0d770209d4cf
Step 3/14 : COPY package*.json ./
 ---> 17bb5854fd86
Step 4/14 : RUN npm install --production
 ---> Running in cf075782e8c3
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
[0mRemoving intermediate container cf075782e8c3
 ---> d81d387c0a4d
Step 5/14 : COPY . .
 ---> 5badfc8d3e95
Step 6/14 : ENV PORT=8080
 ---> Running in 20d321f4624e
Removing intermediate container 20d321f4624e
 ---> d6c49cab5a59
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ded1e8e032c3
Removing intermediate container ded1e8e032c3
 ---> 51c19ac240ad
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 377a79007e38
Removing intermediate container 377a79007e38
 ---> c783d5c0c178
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 509f60e1fccc
Removing intermediate container 509f60e1fccc
 ---> f7a6edcde7dc
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2f1745155562
Removing intermediate container 2f1745155562
 ---> ee98f2958ac5
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in eb1d00c073b8
Removing intermediate container eb1d00c073b8
 ---> 80413300ed77
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in ac89eb0e681f
Removing intermediate container ac89eb0e681f
 ---> 4d0c478cf77f
Step 13/14 : EXPOSE 8080
 ---> Running in 7d1353f4dfef
Removing intermediate container 7d1353f4dfef
 ---> dda0644d5109
Step 14/14 : CMD ["npm","start"]
 ---> Running in e6d72415644a
Removing intermediate container e6d72415644a
 ---> 6a6cb633685f
Successfully built 6a6cb633685f
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
2b5e50346c9d: Preparing
2302ef8ad8cb: Preparing
30c22c3fb647: Preparing
37a4eac3ffb5: Preparing
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
37a4eac3ffb5: Pushed
30c22c3fb647: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
2b5e50346c9d: Pushed
2302ef8ad8cb: Pushed
latest: digest: sha256:3ce0db2d0f68638a2c21ab04d2fd38585d9b2dd432db438437360f1468a517cd size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
73407823-2ba9-4aa7-91b7-e6276d2ac714  2025-10-12T18:39:22+00:00  1M56S     gs://cleanpro-site_cloudbuild/source/1760294336.152734-0df6116d625d43c88232185fcc16b3a5.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy....................done
Creating Revision......................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00505-pfz' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00505-pfz&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00505-pfz%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760294527.886043-90ed0431f0754a1cb5dd0127514e5ef6.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/abf1ae2a-8e55-4ee7-8004-49864cdb3696].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/abf1ae2a-8e55-4ee7-8004-49864cdb3696?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "abf1ae2a-8e55-4ee7-8004-49864cdb3696"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760294527.886043-90ed0431f0754a1cb5dd0127514e5ef6.tgz#1760294553122225
Copying gs://cleanpro-site_cloudbuild/source/1760294527.886043-90ed0431f0754a1cb5dd0127514e5ef6.tgz#1760294553122225...
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
 ---> Running in eb1ae5d74454
Removing intermediate container eb1ae5d74454
 ---> 40063f4a8d2b
Step 3/14 : COPY package*.json ./
 ---> 54154b7d439a
Step 4/14 : RUN npm install --production
 ---> Running in fecb2d7c78b6
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 18s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container fecb2d7c78b6
 ---> a5a1cd5e68cd
Step 5/14 : COPY . .
 ---> 29bc8b017d48
Step 6/14 : ENV PORT=8080
 ---> Running in b4f1a1be0320
Removing intermediate container b4f1a1be0320
 ---> 00a4dbefa701
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 25832350482f
Removing intermediate container 25832350482f
 ---> c7283b5561f5
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in facff9428055
Removing intermediate container facff9428055
 ---> 25da5e3e88ba
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3eb2d5923fc4
Removing intermediate container 3eb2d5923fc4
 ---> 48431db23014
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6a3b75420e0e
Removing intermediate container 6a3b75420e0e
 ---> 03c6d07460a7
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in a0ecc7d8dd42
Removing intermediate container a0ecc7d8dd42
 ---> 009c6510d6f1
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9cb174c8d2fc
Removing intermediate container 9cb174c8d2fc
 ---> 52bec8db9fc0
Step 13/14 : EXPOSE 8080
 ---> Running in 0a41fba284fe
Removing intermediate container 0a41fba284fe
 ---> 4516c5f9c192
Step 14/14 : CMD ["npm","start"]
 ---> Running in 4fbd83c130d3
Removing intermediate container 4fbd83c130d3
 ---> c6a530eacbe8
Successfully built c6a530eacbe8
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
578809045d0a: Preparing
8706cc05f406: Preparing
36d35a0a6622: Preparing
aa9a204c159d: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
7ace34a4ad78: Waiting
e07dd166a3a3: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
36d35a0a6622: Pushed
8ee6722b9ed5: Layer already exists
aa9a204c159d: Pushed
aca836066730: Layer already exists
578809045d0a: Pushed
8706cc05f406: Pushed
latest: digest: sha256:1b617a2835bd8d74e4803d20b64bd15abf5644d447e0cc2f21b03c39614f9f25 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
abf1ae2a-8e55-4ee7-8004-49864cdb3696  2025-10-12T18:42:33+00:00  1M53S     gs://cleanpro-site_cloudbuild/source/1760294527.886043-90ed0431f0754a1cb5dd0127514e5ef6.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision...................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00506-txb' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00506-txb&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00506-txb%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760294714.520425-948c267febe643e1a44cac3ce5049a92.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/04fdb9a2-fe0e-4b8a-bc84-112c3ad05088].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/04fdb9a2-fe0e-4b8a-bc84-112c3ad05088?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "04fdb9a2-fe0e-4b8a-bc84-112c3ad05088"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760294714.520425-948c267febe643e1a44cac3ce5049a92.tgz#1760294739776439
Copying gs://cleanpro-site_cloudbuild/source/1760294714.520425-948c267febe643e1a44cac3ce5049a92.tgz#1760294739776439...
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
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
997b350cffa1: Verifying Checksum
997b350cffa1: Download complete
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
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
 ---> Running in 622826a59d11
Removing intermediate container 622826a59d11
 ---> e5fc3879af81
Step 3/14 : COPY package*.json ./
 ---> e06607f01d94
Step 4/14 : RUN npm install --production
 ---> Running in 0158da155e0f
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
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
[0mRemoving intermediate container 0158da155e0f
 ---> 4a6106a89e68
Step 5/14 : COPY . .
 ---> 3efcf1c2ac0d
Step 6/14 : ENV PORT=8080
 ---> Running in ccd77c473d15
Removing intermediate container ccd77c473d15
 ---> afb3c795604e
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in cb4891b3927a
Removing intermediate container cb4891b3927a
 ---> 13135893de3e
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in b3e844f4c7a9
Removing intermediate container b3e844f4c7a9
 ---> 6b23f579f4c4
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7a3feada507a
Removing intermediate container 7a3feada507a
 ---> 12a74b3ce8ac
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 763417fa6c0f
Removing intermediate container 763417fa6c0f
 ---> bdce320200bc
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 5ff23e5e8625
Removing intermediate container 5ff23e5e8625
 ---> 5d6c76ff8b3e
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d1c573828b9a
Removing intermediate container d1c573828b9a
 ---> da00c94865f1
Step 13/14 : EXPOSE 8080
 ---> Running in 751ef765b8b0
Removing intermediate container 751ef765b8b0
 ---> 670d6ccb2e37
Step 14/14 : CMD ["npm","start"]
 ---> Running in 1500fa4d7e1b
Removing intermediate container 1500fa4d7e1b
 ---> 5b062d60d50b
Successfully built 5b062d60d50b
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
06b1d559e5aa: Preparing
d36ed08e2d29: Preparing
4f72466971fd: Preparing
a40e1d68778a: Preparing
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
4f72466971fd: Pushed
a40e1d68778a: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
06b1d559e5aa: Pushed
d36ed08e2d29: Pushed
latest: digest: sha256:cd66e0677dcf48cc57e2ef69a7201329666c7f9489421b4ac15d025dcf7e8111 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
04fdb9a2-fe0e-4b8a-bc84-112c3ad05088  2025-10-12T18:45:40+00:00  2M11S     gs://cleanpro-site_cloudbuild/source/1760294714.520425-948c267febe643e1a44cac3ce5049a92.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy....................done
Creating Revision.........................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00507-wk5' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00507-wk5&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00507-wk5%22 
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
