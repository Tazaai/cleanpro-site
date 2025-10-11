## �� Reading PROJECT_GUIDE.md for context...
## 🔧 Ensuring firebase_config.json exists in all paths
🩹 Created missing .//firebase_config.json
🩹 Created missing ./backend/firebase_config.json
./review_report.sh: line 28: /app/firebase_config.json: No such file or directory
🩹 Created missing /app/firebase_config.json
## 🧩 Auto-healing project structure from PROJECT_GUIDE.md
## 🔑 Checking required secrets
✅ GOOGLE_MAPS_API_KEY present
✅ GCP_PROJECT present
✅ GCP_SA_KEY present
✅ FIREBASE_KEY present
## �� Validating project structure
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
## 🔥 Firebase Admin init check
## 🎨 Checking frontend

up to date, audited 272 packages in 755ms

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
## ☁️ Deploy & log review
🧠 Attempt 1/3
[33m-[39m Cloning the repository...
[32m✔[39m Repository cloned successfully
run cd fix && pnpm install && pnpm dev
Happy Coding! 💻
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760206603.311074-8825b87aded64c6083735df711eedd7c.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/3938235f-904e-4de2-9fc1-831503b78128].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/3938235f-904e-4de2-9fc1-831503b78128?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "3938235f-904e-4de2-9fc1-831503b78128"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760206603.311074-8825b87aded64c6083735df711eedd7c.tgz#1760206622427968
Copying gs://cleanpro-site_cloudbuild/source/1760206603.311074-8825b87aded64c6083735df711eedd7c.tgz#1760206622427968...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
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
 ---> Running in 02ff572becdc
Removing intermediate container 02ff572becdc
 ---> 683869deec02
Step 3/14 : COPY package*.json ./
 ---> 95fda27d0e35
Step 4/14 : RUN npm install --production
 ---> Running in 3054722386de
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 7s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 3054722386de
 ---> 5fe355b35d43
Step 5/14 : COPY . .
 ---> e990d81f00de
Step 6/14 : ENV PORT=8080
 ---> Running in e72acd25ca8b
Removing intermediate container e72acd25ca8b
 ---> d5dcbf127c4f
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in dd6da979162b
Removing intermediate container dd6da979162b
 ---> c7283dbe367c
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 13145abe5b82
Removing intermediate container 13145abe5b82
 ---> ce4f3e5f1605
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9101752d75f7
Removing intermediate container 9101752d75f7
 ---> 989e4c29fa5a
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2f663c10112d
Removing intermediate container 2f663c10112d
 ---> 8c05fe449ab3
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in cf72f90e74e6
Removing intermediate container cf72f90e74e6
 ---> d9a6afd298c0
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in bd2425f27f57
Removing intermediate container bd2425f27f57
 ---> 4e404675e52a
Step 13/14 : EXPOSE 8080
 ---> Running in c285d3695359
Removing intermediate container c285d3695359
 ---> 7118c8d5d95f
Step 14/14 : CMD ["npm","start"]
 ---> Running in 51a7aac43a56
Removing intermediate container 51a7aac43a56
 ---> 121c736635aa
Successfully built 121c736635aa
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
37e4e0f825b7: Preparing
55b6886796e1: Preparing
d77bc4f4a785: Preparing
e9484c2af2ea: Preparing
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
d77bc4f4a785: Pushed
e9484c2af2ea: Pushed
7ace34a4ad78: Layer already exists
aca836066730: Layer already exists
8ee6722b9ed5: Layer already exists
37e4e0f825b7: Pushed
55b6886796e1: Pushed
latest: digest: sha256:56fd32f295e210f8a7462285abb74ec4f4e4f183f93d1623f2cf2a4cdcae58e6 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
3938235f-904e-4de2-9fc1-831503b78128  2025-10-11T18:17:02+00:00  53S       gs://cleanpro-site_cloudbuild/source/1760206603.311074-8825b87aded64c6083735df711eedd7c.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy........................done
Creating Revision............................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00449-m6q' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00449-m6q&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00449-m6q%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760206704.963659-30aa7780dbb4434ca73d1d1c15e32dbd.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/13957094-f89e-4604-91fb-703d51711b9a].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/13957094-f89e-4604-91fb-703d51711b9a?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "13957094-f89e-4604-91fb-703d51711b9a"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760206704.963659-30aa7780dbb4434ca73d1d1c15e32dbd.tgz#1760206723874413
Copying gs://cleanpro-site_cloudbuild/source/1760206704.963659-30aa7780dbb4434ca73d1d1c15e32dbd.tgz#1760206723874413...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
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
 ---> Running in 0b632f907aef
Removing intermediate container 0b632f907aef
 ---> 242dd2b43415
Step 3/14 : COPY package*.json ./
 ---> 075e621d47c2
Step 4/14 : RUN npm install --production
 ---> Running in df8ac913b77a
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 8s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container df8ac913b77a
 ---> 4e773c045559
Step 5/14 : COPY . .
 ---> 90dad4c943c4
Step 6/14 : ENV PORT=8080
 ---> Running in a1bfe4b82ec9
Removing intermediate container a1bfe4b82ec9
 ---> 85642c437e9f
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 48331b7542b3
Removing intermediate container 48331b7542b3
 ---> b5c641c664ac
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 6e485d3a944e
Removing intermediate container 6e485d3a944e
 ---> fa4739252fa0
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 0ab37686c031
Removing intermediate container 0ab37686c031
 ---> cb935e374d28
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 8c1be5f94b17
Removing intermediate container 8c1be5f94b17
 ---> b574346df374
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in ed429304ef5d
Removing intermediate container ed429304ef5d
 ---> 9d965c052bdd
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d622176e00fe
Removing intermediate container d622176e00fe
 ---> d5a83922275c
Step 13/14 : EXPOSE 8080
 ---> Running in 640decbc95fe
Removing intermediate container 640decbc95fe
 ---> d21167184b86
Step 14/14 : CMD ["npm","start"]
 ---> Running in c6be8fdd4029
Removing intermediate container c6be8fdd4029
 ---> 9bf8f4bab607
Successfully built 9bf8f4bab607
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
f390b3fe6ea2: Preparing
697384428b9f: Preparing
5ce5c8370903: Preparing
bac06bd0fd1f: Preparing
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
5ce5c8370903: Pushed
8ee6722b9ed5: Layer already exists
bac06bd0fd1f: Pushed
aca836066730: Layer already exists
f390b3fe6ea2: Pushed
697384428b9f: Pushed
latest: digest: sha256:2e4b4f7711ff9a313f3e9ec7052e67d3125c15835c51ffa7674b0737c3149c67 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
13957094-f89e-4604-91fb-703d51711b9a  2025-10-11T18:18:44+00:00  54S       gs://cleanpro-site_cloudbuild/source/1760206704.963659-30aa7780dbb4434ca73d1d1c15e32dbd.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision.........................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00450-dg7' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00450-dg7&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00450-dg7%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
[33m-[39m Cloning the repository...
[31m✖[39m Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760206810.409203-08ddc1a3132c4d90b4b44bc067559998.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/0319e8a0-151a-4eaa-82c8-6b3b47784579].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/0319e8a0-151a-4eaa-82c8-6b3b47784579?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "0319e8a0-151a-4eaa-82c8-6b3b47784579"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760206810.409203-08ddc1a3132c4d90b4b44bc067559998.tgz#1760206828829353
Copying gs://cleanpro-site_cloudbuild/source/1760206810.409203-08ddc1a3132c4d90b4b44bc067559998.tgz#1760206828829353...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
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
 ---> Running in 757b11c15cea
Removing intermediate container 757b11c15cea
 ---> ecd42b1a46d1
Step 3/14 : COPY package*.json ./
 ---> 723382b675d4
Step 4/14 : RUN npm install --production
 ---> Running in 7b4b6cd83657
[91mnpm warn config production Use `--omit=dev` instead.
[0m[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
[0m
added 247 packages, and audited 248 packages in 8s

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
[91mnpm notice
npm notice New major version of npm available! 10.8.2 -> 11.6.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.6.2
npm notice To update run: npm install -g npm@11.6.2
npm notice
[0mRemoving intermediate container 7b4b6cd83657
 ---> f98edd6cabb2
Step 5/14 : COPY . .
 ---> 4a59c4d381d0
Step 6/14 : ENV PORT=8080
 ---> Running in 9a2e37d46e94
Removing intermediate container 9a2e37d46e94
 ---> 27e58791f30c
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9e8dee2562d4
Removing intermediate container 9e8dee2562d4
 ---> ada767ca21a8
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 7f75149f642e
Removing intermediate container 7f75149f642e
 ---> d16bf5631c1d
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 7d989fec6910
Removing intermediate container 7d989fec6910
 ---> 1d5e65b68e31
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in f5389c019296
Removing intermediate container f5389c019296
 ---> 7447f71f1390
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 9da225de812a
Removing intermediate container 9da225de812a
 ---> 55428797f39b
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 810aad35e430
Removing intermediate container 810aad35e430
 ---> 9575d95efb77
Step 13/14 : EXPOSE 8080
 ---> Running in 050bbf303781
Removing intermediate container 050bbf303781
 ---> 9e897faa0f9a
Step 14/14 : CMD ["npm","start"]
 ---> Running in cef76d21a4b5
Removing intermediate container cef76d21a4b5
 ---> b234e972a08a
Successfully built b234e972a08a
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
03f60496cf89: Preparing
a6d380f72c9e: Preparing
367176e52dd8: Preparing
f9d258784322: Preparing
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
f9d258784322: Pushed
367176e52dd8: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
03f60496cf89: Pushed
a6d380f72c9e: Pushed
latest: digest: sha256:d29cd1291365a770834bcdf7cadf1aa9a14a78b015eb5298c09678b699966e09 size: 2207
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
0319e8a0-151a-4eaa-82c8-6b3b47784579  2025-10-11T18:20:29+00:00  1M        gs://cleanpro-site_cloudbuild/source/1760206810.409203-08ddc1a3132c4d90b4b44bc067559998.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.......................done
Creating Revision.............................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00451-qtw' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00451-qtw&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00451-qtw%22 
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
