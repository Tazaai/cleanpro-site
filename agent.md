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

added 344 packages, and audited 345 packages in 16s

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
[32m✓ built in 2.06s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760535077.361853-a50c5980587c456490490287b8484ed6.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/68a46369-222c-4fcb-83d1-becb83c7b662].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/68a46369-222c-4fcb-83d1-becb83c7b662?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "68a46369-222c-4fcb-83d1-becb83c7b662"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760535077.361853-a50c5980587c456490490287b8484ed6.tgz#1760535095837741
Copying gs://cleanpro-site_cloudbuild/source/1760535077.361853-a50c5980587c456490490287b8484ed6.tgz#1760535095837741...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/18 : FROM node:20
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
Step 2/18 : WORKDIR /app/backend
 ---> Running in db4f48efd08a
Removing intermediate container db4f48efd08a
 ---> 4a9114253229
Step 3/18 : WORKDIR /app/backend
 ---> Running in 75d4d7db84fe
Removing intermediate container 75d4d7db84fe
 ---> b481d0ecb505
Step 4/18 : COPY package*.json ./
 ---> 306ca43ac9ac
Step 5/18 : RUN npm install --omit=dev
 ---> Running in 2428e037bbae
[91mnpm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
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
[0mRemoving intermediate container 2428e037bbae
 ---> 4538b43d616f
Step 6/18 : COPY . .
 ---> 53ca849980e8
Step 7/18 : ENV PORT=8080
 ---> Running in f7a4a86c573d
Removing intermediate container f7a4a86c573d
 ---> cbf5538cd106
Step 8/18 : ENV HOST=0.0.0.0
 ---> Running in 9e119c6b2058
Removing intermediate container 9e119c6b2058
 ---> 994431006e4c
Step 9/18 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 2a5d9c41e36c
Removing intermediate container 2a5d9c41e36c
 ---> c61fcc1039cb
Step 10/18 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in b9f357b13406
Removing intermediate container b9f357b13406
 ---> f2fcab1b9a71
Step 11/18 : EXPOSE 8080
 ---> Running in 57bed733d625
Removing intermediate container 57bed733d625
 ---> 94e81f0edae4
Step 12/18 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in fd32de286b6f
Removing intermediate container fd32de286b6f
 ---> 5872e4657d03
Step 13/18 : CMD ["node", "index.js"]
 ---> Running in 98cede503dc3
Removing intermediate container 98cede503dc3
 ---> 29b997799181
Step 14/18 : CMD ["node","index.js"]
 ---> Running in 3fd0c83f98b7
Removing intermediate container 3fd0c83f98b7
 ---> 348f1147e5a6
Step 15/18 : CMD ["node","index.js"]
 ---> Running in 33ed594d8f00
Removing intermediate container 33ed594d8f00
 ---> fe470189b609
Step 16/18 : CMD ["node","index.js"]
 ---> Running in f67e598f640c
Removing intermediate container f67e598f640c
 ---> a917b3b07df9
Step 17/18 : CMD ["node","index.js"]
 ---> Running in bd87549a87ee
Removing intermediate container bd87549a87ee
 ---> 86f79f7dcf6f
Step 18/18 : CMD ["node","index.js"]
 ---> Running in 910a4b7ee879
Removing intermediate container 910a4b7ee879
 ---> 5c281f287176
Successfully built 5c281f287176
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
aad0834a9ef4: Preparing
0f3a2777f063: Preparing
0fcac5cada3b: Preparing
0e60050f90d1: Preparing
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
0fcac5cada3b: Pushed
316cddb5fa75: Layer already exists
0e60050f90d1: Pushed
3f1630e3667f: Layer already exists
1bd72b149259: Layer already exists
060ee1077a8d: Layer already exists
3b385b8d2549: Layer already exists
aad0834a9ef4: Pushed
0f3a2777f063: Pushed
latest: digest: sha256:ffd638e02ebc8404851ebdbaa509efa155248cca4acfc0f33d8f7719e593a420 size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
68a46369-222c-4fcb-83d1-becb83c7b662  2025-10-15T13:31:36+00:00  1M26S     gs://cleanpro-site_cloudbuild/source/1760535077.361853-a50c5980587c456490490287b8484ed6.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision.........................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00613-kgb' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00613-kgb&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00613-kgb%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/13.34.08.581947.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760535248.798932-9494d0afb1644fa9a50f7ce07a96a1b2.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/497193f5-0f57-4756-8034-664f650e019b].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/497193f5-0f57-4756-8034-664f650e019b?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "497193f5-0f57-4756-8034-664f650e019b"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760535248.798932-9494d0afb1644fa9a50f7ce07a96a1b2.tgz#1760535249068716
Copying gs://cleanpro-site_cloudbuild/source/1760535248.798932-9494d0afb1644fa9a50f7ce07a96a1b2.tgz#1760535249068716...
/ [0 files][    0.0 B/163.8 KiB]                                                / [1 files][163.8 KiB/163.8 KiB]                                                
Operation completed over 1 objects/163.8 KiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon    340kB
Step 1/11 : FROM node:20-alpine AS build
20-alpine: Pulling from library/node
2d35ebdb57d9: Already exists
c087321cece4: Pulling fs layer
f2fbe8556258: Pulling fs layer
c74c90aa7c87: Pulling fs layer
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
 ---> Running in 3185fcdccd2a
Removing intermediate container 3185fcdccd2a
 ---> 3e2422c74bf2
Step 3/11 : COPY package*.json ./
 ---> 7b7d6f71b887
Step 4/11 : RUN npm install
 ---> Running in 89f84154e4b5

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
[0mRemoving intermediate container 89f84154e4b5
 ---> 4a084bd3b69a
Step 5/11 : COPY . .
 ---> ab19b0f5627d
Step 6/11 : RUN npm run build
 ---> Running in 8c2f3c26cb36

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
✓ built in 5.47s
Removing intermediate container 8c2f3c26cb36
 ---> 63f83e0ba0b1
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
03e63548f209: Verifying Checksum
03e63548f209: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
e2d0ea5d3690: Verifying Checksum
e2d0ea5d3690: Download complete
f80aba050ead: Download complete
7fb80c2f28bc: Download complete
f80aba050ead: Pull complete
76c9bcaa4163: Verifying Checksum
76c9bcaa4163: Download complete
621a51978ed7: Pull complete
03e63548f209: Pull complete
83ce83cd9960: Pull complete
e2d0ea5d3690: Pull complete
7fb80c2f28bc: Pull complete
76c9bcaa4163: Pull complete
Digest: sha256:61e01287e546aac28a3f56839c136b31f590273f3b41187a36f46f6a03bbfe22
Status: Downloaded newer image for nginx:alpine
 ---> 5e7abcdd2021
Step 8/11 : COPY --from=build /app/dist /usr/share/nginx/html
 ---> a40f8d27d318
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 9546838d521e
Step 10/11 : EXPOSE 8080
 ---> Running in 5e049a1da8d9
Removing intermediate container 5e049a1da8d9
 ---> de1d2f11606b
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in d8dd590fa3aa
Removing intermediate container d8dd590fa3aa
 ---> 614cb15f9306
Successfully built 614cb15f9306
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
0e1e209a60b5: Preparing
6aa9a6f5d377: Preparing
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
dc45ec6c902b: Layer already exists
e9a26559275d: Layer already exists
1704c5a3d8da: Layer already exists
3e4655a38876: Layer already exists
ed6be5e2fd33: Layer already exists
abbef7f88314: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
0e1e209a60b5: Pushed
6aa9a6f5d377: Pushed
latest: digest: sha256:4ca1edfecde7c02a9d163018ccc90c9348b0ea537b6cb7d743cad2d7213a9219 size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
497193f5-0f57-4756-8034-664f650e019b  2025-10-15T13:34:09+00:00  1M12S     gs://cleanpro-site_cloudbuild/source/1760535248.798932-9494d0afb1644fa9a50f7ce07a96a1b2.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.....................done
Creating Revision...........................................................................................................................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00190-9xr] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
[main c54f6b2] chore(codox): automated review & deploy report
 1 file changed, 139 insertions(+), 143 deletions(-)
To https://github.com/Tazaai/cleanpro-site
   8fbafcb..c54f6b2  main -> main
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
⚠️ Git rebase failed — showing conflicts...
❌ Codox run detected issues — review agent.md
