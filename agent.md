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

up to date, audited 272 packages in 782ms

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
[32m✓ built in 1.96s[39m
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
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760293025.894667-7888b9d9bdd944aea1cfb8eead5016e4.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/778b6b96-0bbb-4002-a40c-6aba7dc24fc5].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/778b6b96-0bbb-4002-a40c-6aba7dc24fc5?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "778b6b96-0bbb-4002-a40c-6aba7dc24fc5"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760293025.894667-7888b9d9bdd944aea1cfb8eead5016e4.tgz#1760293051663840
Copying gs://cleanpro-site_cloudbuild/source/1760293025.894667-7888b9d9bdd944aea1cfb8eead5016e4.tgz#1760293051663840...
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
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
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
 ---> Running in b65e8cc980cc
Removing intermediate container b65e8cc980cc
 ---> facc21296c77
Step 3/14 : COPY package*.json ./
 ---> 3a78f44cd840
Step 4/14 : RUN npm install --production
 ---> Running in 1ba9f5e60f50
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
[0mRemoving intermediate container 1ba9f5e60f50
 ---> 31c402afc00b
Step 5/14 : COPY . .
 ---> 091573f9c808
Step 6/14 : ENV PORT=8080
 ---> Running in 18da25d67e11
Removing intermediate container 18da25d67e11
 ---> 5a6349a27a9a
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 825372dfe4b7
Removing intermediate container 825372dfe4b7
 ---> 9c6c69c7deeb
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 0d0f36211c92
Removing intermediate container 0d0f36211c92
 ---> ceeaf2b03043
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 364a61f19851
Removing intermediate container 364a61f19851
 ---> 25774907cbec
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 3b0866be646c
Removing intermediate container 3b0866be646c
 ---> bec4c7765b5d
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ccf769f4c011
Removing intermediate container ccf769f4c011
 ---> 0bb51cad4d0a
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9b8899bcfcaa
Removing intermediate container 9b8899bcfcaa
 ---> 4c02dc6ab0ae
Step 13/14 : EXPOSE 8080
 ---> Running in 3faf115bc4a3
Removing intermediate container 3faf115bc4a3
 ---> f81ed10f21bc
Step 14/14 : CMD ["npm","start"]
 ---> Running in 0e34014446c3
Removing intermediate container 0e34014446c3
 ---> 796e3f06b17b
Successfully built 796e3f06b17b
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
a32263f58ea0: Preparing
a1aae861c267: Preparing
425a880e081f: Preparing
5dde17fd11b1: Preparing
5172397fbcd4: Preparing
e07dd166a3a3: Preparing
7ace34a4ad78: Preparing
8ee6722b9ed5: Preparing
aca836066730: Preparing
7ace34a4ad78: Waiting
8ee6722b9ed5: Waiting
aca836066730: Waiting
e07dd166a3a3: Waiting
5172397fbcd4: Layer already exists
e07dd166a3a3: Layer already exists
7ace34a4ad78: Layer already exists
425a880e081f: Pushed
5dde17fd11b1: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
a32263f58ea0: Pushed
a1aae861c267: Pushed
latest: digest: sha256:eb17cbce438aefe754d90db747b4b70656e65e4f0e18941f75fcb572506a607f size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
778b6b96-0bbb-4002-a40c-6aba7dc24fc5  2025-10-12T18:17:32+00:00  1M55S     gs://cleanpro-site_cloudbuild/source/1760293025.894667-7888b9d9bdd944aea1cfb8eead5016e4.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.............................done
Creating Revision.............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00501-dpp' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00501-dpp&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00501-dpp%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760293246.387037-9539afcd1e634c3aa6f60ec54975968a.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/45ab10d1-f83b-4b02-8bd8-28de9f24d0cd].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/45ab10d1-f83b-4b02-8bd8-28de9f24d0cd?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "45ab10d1-f83b-4b02-8bd8-28de9f24d0cd"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760293246.387037-9539afcd1e634c3aa6f60ec54975968a.tgz#1760293272896236
Copying gs://cleanpro-site_cloudbuild/source/1760293246.387037-9539afcd1e634c3aa6f60ec54975968a.tgz#1760293272896236...
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
ab9c5ae25e4d: Verifying Checksum
ab9c5ae25e4d: Download complete
5c32499ab806: Verifying Checksum
5c32499ab806: Download complete
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
 ---> Running in 9eedd59fdcf1
Removing intermediate container 9eedd59fdcf1
 ---> d9a8cccca1a7
Step 3/14 : COPY package*.json ./
 ---> 637344e34d9e
Step 4/14 : RUN npm install --production
 ---> Running in 7cba697fb1c5
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 319 packages, and audited 320 packages in 13s

37 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 7cba697fb1c5
 ---> 0fedccfd0d29
Step 5/14 : COPY . .
 ---> d20507018bdf
Step 6/14 : ENV PORT=8080
 ---> Running in f6d7785ded9c
Removing intermediate container f6d7785ded9c
 ---> afa640d4ecd9
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4111ccf4578b
Removing intermediate container 4111ccf4578b
 ---> 6dc7c8f932cf
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 361e45aa4201
Removing intermediate container 361e45aa4201
 ---> 095567d3b15b
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f86c855c6daf
Removing intermediate container f86c855c6daf
 ---> e036d5662aa5
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 11339d9b933b
Removing intermediate container 11339d9b933b
 ---> 92f3cd5110a3
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in bd5c47636a51
Removing intermediate container bd5c47636a51
 ---> 2f80ff24979a
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6cac9f40a5d7
Removing intermediate container 6cac9f40a5d7
 ---> f248b868ecff
Step 13/14 : EXPOSE 8080
 ---> Running in c7bc6201293b
Removing intermediate container c7bc6201293b
 ---> 44f5b5b16810
Step 14/14 : CMD ["npm","start"]
 ---> Running in b1d4f722c10e
Removing intermediate container b1d4f722c10e
 ---> 70a53d409540
Successfully built 70a53d409540
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
25920bf2f15f: Preparing
7ba79f57da65: Preparing
ac726ceb1c7d: Preparing
5733878bf7a7: Preparing
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
ac726ceb1c7d: Pushed
7ace34a4ad78: Layer already exists
5733878bf7a7: Pushed
aca836066730: Layer already exists
8ee6722b9ed5: Layer already exists
25920bf2f15f: Pushed
7ba79f57da65: Pushed
latest: digest: sha256:e0691518a39f3600cc9d2eb3236026c8db9a81b9d55a1dd25a615ab3986258d5 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
45ab10d1-f83b-4b02-8bd8-28de9f24d0cd  2025-10-12T18:21:13+00:00  1M29S     gs://cleanpro-site_cloudbuild/source/1760293246.387037-9539afcd1e634c3aa6f60ec54975968a.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision.............................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00502-s8w' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00502-s8w&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00502-s8w%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 11559 file(s) totalling 203.3 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760293417.731323-16159c615b1b4d769e513b219915ad91.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/23c1778b-83a6-4ec3-bac8-4c7b6db5a0a1].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/23c1778b-83a6-4ec3-bac8-4c7b6db5a0a1?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "23c1778b-83a6-4ec3-bac8-4c7b6db5a0a1"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760293417.731323-16159c615b1b4d769e513b219915ad91.tgz#1760293442798080
Copying gs://cleanpro-site_cloudbuild/source/1760293417.731323-16159c615b1b4d769e513b219915ad91.tgz#1760293442798080...
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
 ---> Running in 8cb50989645e
Removing intermediate container 8cb50989645e
 ---> 28473a8496a6
Step 3/14 : COPY package*.json ./
 ---> be09250fa9d3
Step 4/14 : RUN npm install --production
 ---> Running in 247fae94279f
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
[0mRemoving intermediate container 247fae94279f
 ---> 8d6641b6c314
Step 5/14 : COPY . .
 ---> 4f3076a9e253
Step 6/14 : ENV PORT=8080
 ---> Running in b4fdad885ee6
Removing intermediate container b4fdad885ee6
 ---> 8419836ef556
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9ae46c7e4d56
Removing intermediate container 9ae46c7e4d56
 ---> 310fcaa49551
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in bc8d144962d0
Removing intermediate container bc8d144962d0
 ---> 4a4660440345
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 762aa4b0e9d6
Removing intermediate container 762aa4b0e9d6
 ---> bf01690de0f2
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 837aca0bd809
Removing intermediate container 837aca0bd809
 ---> dd26cafc338c
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 6588239640d5
Removing intermediate container 6588239640d5
 ---> c55826cab050
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in b1b2916bdf26
Removing intermediate container b1b2916bdf26
 ---> 1f658a4c4ff0
Step 13/14 : EXPOSE 8080
 ---> Running in 31f968de40ff
Removing intermediate container 31f968de40ff
 ---> 789add846f75
Step 14/14 : CMD ["npm","start"]
 ---> Running in 500db19c37a9
Removing intermediate container 500db19c37a9
 ---> 1640ef09eb83
Successfully built 1640ef09eb83
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
3b0099e451d6: Preparing
7a7a2923906a: Preparing
31e4f0056169: Preparing
cb6f43406203: Preparing
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
cb6f43406203: Pushed
31e4f0056169: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
3b0099e451d6: Pushed
7a7a2923906a: Pushed
latest: digest: sha256:116cbe6cb7b0e9f4278ccceb37f619c37db1964b1808d3363e6ab004409ba6e5 size: 2208
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
23c1778b-83a6-4ec3-bac8-4c7b6db5a0a1  2025-10-12T18:24:03+00:00  2M2S      gs://cleanpro-site_cloudbuild/source/1760293417.731323-16159c615b1b4d769e513b219915ad91.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...........................done
Creating Revision.........................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00503-4tc' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00503-4tc&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00503-4tc%22 
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
