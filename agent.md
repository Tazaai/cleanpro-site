## �� Reading PROJECT_GUIDE.md for context...
## 🔧 Ensuring firebase_config.json exists in all paths
skip firebase_config.json in local context
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
## 🎨 Checking frontend API_BASE default
## 🎨 Checking frontend

added 11 packages, removed 22 packages, changed 22 packages, and audited 272 packages in 8s

42 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

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
✓ built in 4.54s
## 🗄️ Checking Firebase structure
node:internal/modules/package_json_reader:256
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'firebase-admin' imported from /workspaces/cleanpro-site/[eval1]
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:256:9)
    at packageResolve (node:internal/modules/esm/resolve:768:81)
    at moduleResolve (node:internal/modules/esm/resolve:854:18)
    at defaultResolve (node:internal/modules/esm/resolve:984:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:780:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:704:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:687:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:305:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:175:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v22.17.0
🧩 Synced firebase_config.json to root and /app/
## ☁️ Deploy & log review
🧠 Attempt 1/3
- Cloning the repository...
✔ Repository cloned successfully
run cd fix && pnpm install && pnpm dev
Happy Coding! 💻
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760256191.096734-ad56ccf86aa248a9b53d63a2141255e1.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/e5403600-87f7-447b-811a-c867c8bd6003].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/e5403600-87f7-447b-811a-c867c8bd6003?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------------- REMOTE BUILD OUTPUT -----------------------------------
starting build "e5403600-87f7-447b-811a-c867c8bd6003"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760256191.096734-ad56ccf86aa248a9b53d63a2141255e1.tgz#1760256226132561
Copying gs://cleanpro-site_cloudbuild/source/1760256191.096734-ad56ccf86aa248a9b53d63a2141255e1.tgz#1760256226132561...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/docker
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
 ---> Running in e91037752e94
Removing intermediate container e91037752e94
 ---> 0fe23d89223c
Step 3/14 : COPY package*.json ./
 ---> b5d5709c94aa
Step 4/14 : RUN npm install --production
 ---> Running in 2301715050de
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
[0mRemoving intermediate container 2301715050de
 ---> e0262773a10a
Step 5/14 : COPY . .
 ---> 98ff981fe2ec
Step 6/14 : ENV PORT=8080
 ---> Running in 56dc08036d1f
Removing intermediate container 56dc08036d1f
 ---> 15f1b8c3b926
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 899f89a347b8
Removing intermediate container 899f89a347b8
 ---> 1adf98e07329
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in d2349a75f2c5
Removing intermediate container d2349a75f2c5
 ---> b98f39fd90dd
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 9f8261f8c088
Removing intermediate container 9f8261f8c088
 ---> 9cd2d09ef2de
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 31a5e4f21832
Removing intermediate container 31a5e4f21832
 ---> 643ba4d29ac0
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 900aa1004ade
Removing intermediate container 900aa1004ade
 ---> 8e3adb8b9902
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in fa9294872c90
Removing intermediate container fa9294872c90
 ---> c0f2721e50fa
Step 13/14 : EXPOSE 8080
 ---> Running in 4591ca28339c
Removing intermediate container 4591ca28339c
 ---> f044348fdc74
Step 14/14 : CMD ["npm","start"]
 ---> Running in 5cfa53c996a3
Removing intermediate container 5cfa53c996a3
 ---> 5019b9040832
Successfully built 5019b9040832
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
5887e06e8b93: Preparing
3f20ad60be31: Preparing
4ace211cd687: Preparing
5f01fcf8e8f6: Preparing
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
5f01fcf8e8f6: Pushed
4ace211cd687: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
5887e06e8b93: Pushed
3f20ad60be31: Pushed
latest: digest: sha256:79083137a991a6215e722cca1862b8c659cc89104949270a8bd027bf06c6765f size: 2207
DONE
-------------------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
e5403600-87f7-447b-811a-c867c8bd6003  2025-10-12T08:03:46+00:00  1M1S      gs://cleanpro-site_cloudbuild/source/1760256191.096734-ad56ccf86aa248a9b53d63a2141255e1.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [[1mcleanpro-backend[m] in project [[1mcleanpro-site[m] region [[1meurope-west1[m]
Deploying...
Setting IAM Policy..............done
Creating Revision.......................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00471-fwn' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00471-fwn&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00471-fwn%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 1 failed — reading Cloud Run logs...
🧠 Attempt 2/3
- Cloning the repository...
✖ Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760256346.808289-6047ff40fd66402eb83f6f2468472987.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/4d6a4dd1-c69a-4009-aabe-f782044f590a].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/4d6a4dd1-c69a-4009-aabe-f782044f590a?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------------- REMOTE BUILD OUTPUT -----------------------------------
starting build "4d6a4dd1-c69a-4009-aabe-f782044f590a"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760256346.808289-6047ff40fd66402eb83f6f2468472987.tgz#1760256367852667
Copying gs://cleanpro-site_cloudbuild/source/1760256346.808289-6047ff40fd66402eb83f6f2468472987.tgz#1760256367852667...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/docker
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
 ---> Running in 87f89fe0045d
Removing intermediate container 87f89fe0045d
 ---> b00886bc15b2
Step 3/14 : COPY package*.json ./
 ---> 554381db0f33
Step 4/14 : RUN npm install --production
 ---> Running in 27d7a4d8c48d
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
[0mRemoving intermediate container 27d7a4d8c48d
 ---> 8cba69eb7c5d
Step 5/14 : COPY . .
 ---> 11a0d525de6a
Step 6/14 : ENV PORT=8080
 ---> Running in faa775da9fdd
Removing intermediate container faa775da9fdd
 ---> 30a77d690026
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 6b285045ebbf
Removing intermediate container 6b285045ebbf
 ---> 0a8c4f93c003
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in d3cd35dc836b
Removing intermediate container d3cd35dc836b
 ---> 0506c77858f2
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in c706cdd0b96c
Removing intermediate container c706cdd0b96c
 ---> e50f3819ff6b
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in dbf6f230119b
Removing intermediate container dbf6f230119b
 ---> 89a4882979ed
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in e43a44434c6f
Removing intermediate container e43a44434c6f
 ---> 121cb565d307
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 15cd967e38f9
Removing intermediate container 15cd967e38f9
 ---> 63224893ebb9
Step 13/14 : EXPOSE 8080
 ---> Running in 87c744c4f2da
Removing intermediate container 87c744c4f2da
 ---> 2bcb02de3dc0
Step 14/14 : CMD ["npm","start"]
 ---> Running in 33ec475a4bf5
Removing intermediate container 33ec475a4bf5
 ---> 8d14d7b03550
Successfully built 8d14d7b03550
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
1274d276d631: Preparing
141285572310: Preparing
48d3d63b2cba: Preparing
72cca7ae557f: Preparing
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
72cca7ae557f: Pushed
7ace34a4ad78: Layer already exists
48d3d63b2cba: Pushed
8ee6722b9ed5: Layer already exists
aca836066730: Layer already exists
1274d276d631: Pushed
141285572310: Pushed
latest: digest: sha256:5608698e0bab741e3e950bd3d364959bfbdf8d6c53d2ee04008abc03110c74e4 size: 2207
DONE
-------------------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
4d6a4dd1-c69a-4009-aabe-f782044f590a  2025-10-12T08:06:08+00:00  57S       gs://cleanpro-site_cloudbuild/source/1760256346.808289-6047ff40fd66402eb83f6f2468472987.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [[1mcleanpro-backend[m] in project [[1mcleanpro-site[m] region [[1meurope-west1[m]
Deploying...
Setting IAM Policy.............done
Creating Revision.................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00472-bmq' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00472-bmq&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00472-bmq%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Retry 2 failed — reading Cloud Run logs...
🧠 Attempt 3/3
- Cloning the repository...
✖ Something went wrong!
If you encounter any issues, please report them to https://github.com/sujjeee/codox. Your feedback is appreciated! 🙏
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7658 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760256481.161529-3ef84b1fd53d41869adb8c6fbb56f8e4.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/68b43332-91fe-4cb3-850c-74bb993637d3].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/68b43332-91fe-4cb3-850c-74bb993637d3?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------------- REMOTE BUILD OUTPUT -----------------------------------
starting build "68b43332-91fe-4cb3-850c-74bb993637d3"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760256481.161529-3ef84b1fd53d41869adb8c6fbb56f8e4.tgz#1760256501167028
Copying gs://cleanpro-site_cloudbuild/source/1760256481.161529-3ef84b1fd53d41869adb8c6fbb56f8e4.tgz#1760256501167028...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/docker
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
 ---> Running in e470e3274838
Removing intermediate container e470e3274838
 ---> 26c94aba6279
Step 3/14 : COPY package*.json ./
 ---> 9655ed801593
Step 4/14 : RUN npm install --production
 ---> Running in 8e192c8ac787
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
[0mRemoving intermediate container 8e192c8ac787
 ---> e09fc49438e4
Step 5/14 : COPY . .
 ---> cf80220227bd
Step 6/14 : ENV PORT=8080
 ---> Running in 26ee4c80865b
Removing intermediate container 26ee4c80865b
 ---> f76736eb555d
Step 7/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 4fb199d83ce1
Removing intermediate container 4fb199d83ce1
 ---> 301c58b5c620
Step 8/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in c24e84e091cc
Removing intermediate container c24e84e091cc
 ---> ec2d4aac1673
Step 9/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 456e7551db04
Removing intermediate container 456e7551db04
 ---> 1c39b522efee
Step 10/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2fbd13d7f998
Removing intermediate container 2fbd13d7f998
 ---> af57c918450b
Step 11/14 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in c77b4041d913
Removing intermediate container c77b4041d913
 ---> 7082a16071b2
Step 12/14 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2075ddd61a24
Removing intermediate container 2075ddd61a24
 ---> f8b248969969
Step 13/14 : EXPOSE 8080
 ---> Running in b97625c9834e
Removing intermediate container b97625c9834e
 ---> 0752078b06a9
Step 14/14 : CMD ["npm","start"]
 ---> Running in 2707e205475c
Removing intermediate container 2707e205475c
 ---> 11a1ba96ed30
Successfully built 11a1ba96ed30
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
f08d27d46b10: Preparing
f542bd11fa14: Preparing
578286c6ac3f: Preparing
434d8274a206: Preparing
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
578286c6ac3f: Pushed
434d8274a206: Pushed
aca836066730: Layer already exists
8ee6722b9ed5: Layer already exists
f08d27d46b10: Pushed
f542bd11fa14: Pushed
latest: digest: sha256:ed0c15940c729128dfdc205b263d120d4292a2a1163f7ea561c96accd7732855 size: 2207
DONE
-------------------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
68b43332-91fe-4cb3-850c-74bb993637d3  2025-10-12T08:08:21+00:00  52S       gs://cleanpro-site_cloudbuild/source/1760256481.161529-3ef84b1fd53d41869adb8c6fbb56f8e4.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [[1mcleanpro-backend[m] in project [[1mcleanpro-site[m] region [[1meurope-west1[m]
Deploying...
Setting IAM Policy.............done
Creating Revision......................................................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00473-js2' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00473-js2&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00473-js2%22 
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
node:internal/modules/package_json_reader:256
  throw new ERR_MODULE_NOT_FOUND(packageName, fileURLToPath(base), null);
        ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'puppeteer' imported from /workspaces/cleanpro-site/[eval1]
    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:256:9)
    at packageResolve (node:internal/modules/esm/resolve:768:81)
    at moduleResolve (node:internal/modules/esm/resolve:854:18)
    at defaultResolve (node:internal/modules/esm/resolve:984:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:780:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:704:25)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:687:38)
    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:305:38)
    at ModuleJob._link (node:internal/modules/esm/module_job:175:49)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v22.17.0
❌ Frontend tests failed
