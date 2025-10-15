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
[32m✓ built in 1.92s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760540972.650682-6d3a7c41941541899db3d113b98749dc.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/3b99e92a-dff3-45aa-948e-9014e6977709].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/3b99e92a-dff3-45aa-948e-9014e6977709?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "3b99e92a-dff3-45aa-948e-9014e6977709"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760540972.650682-6d3a7c41941541899db3d113b98749dc.tgz#1760540990950717
Copying gs://cleanpro-site_cloudbuild/source/1760540972.650682-6d3a7c41941541899db3d113b98749dc.tgz#1760540990950717...
/ [0 files][    0.0 B/ 22.9 MiB]                                                / [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/22 : FROM node:20
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
Step 2/22 : WORKDIR /app/backend
 ---> Running in 0fb67d7ff5cd
Removing intermediate container 0fb67d7ff5cd
 ---> 3d0d906367a5
Step 3/22 : WORKDIR /app/backend
 ---> Running in 3cbabae9923f
Removing intermediate container 3cbabae9923f
 ---> 78f6a1f9eb51
Step 4/22 : COPY package*.json ./
 ---> a49b5a55b389
Step 5/22 : RUN npm install --omit=dev
 ---> Running in 0b202d994188
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
[0mRemoving intermediate container 0b202d994188
 ---> 33413af35f87
Step 6/22 : COPY . .
 ---> a1079a1515e6
Step 7/22 : ENV PORT=8080
 ---> Running in a3f578714e9d
Removing intermediate container a3f578714e9d
 ---> eb85179bea0e
Step 8/22 : ENV HOST=0.0.0.0
 ---> Running in 940cc87d768d
Removing intermediate container 940cc87d768d
 ---> 79e107997233
Step 9/22 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in 573de1fbc7ed
Removing intermediate container 573de1fbc7ed
 ---> 5fbd97ab299a
Step 10/22 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 60f775b5c608
Removing intermediate container 60f775b5c608
 ---> da30ef81f1de
Step 11/22 : EXPOSE 8080
 ---> Running in 4e260bc038da
Removing intermediate container 4e260bc038da
 ---> c761d9e9e190
Step 12/22 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in a0b8cbe0268f
Removing intermediate container a0b8cbe0268f
 ---> b4b7f7ca557f
Step 13/22 : CMD ["node", "index.js"]
 ---> Running in b2a28b870824
Removing intermediate container b2a28b870824
 ---> 63d88dc1e4f8
Step 14/22 : CMD ["node","index.js"]
 ---> Running in f1321c218890
Removing intermediate container f1321c218890
 ---> 913ef72832b3
Step 15/22 : CMD ["node","index.js"]
 ---> Running in 0fb7ddeb46df
Removing intermediate container 0fb7ddeb46df
 ---> fcd7653da1fc
Step 16/22 : CMD ["node","index.js"]
 ---> Running in 6f99884b8ce5
Removing intermediate container 6f99884b8ce5
 ---> abf7ea5a8d6a
Step 17/22 : CMD ["node","index.js"]
 ---> Running in 0401d94b6392
Removing intermediate container 0401d94b6392
 ---> 100263ad334b
Step 18/22 : CMD ["node","index.js"]
 ---> Running in 29f3225259d8
Removing intermediate container 29f3225259d8
 ---> 34c9703ec7be
Step 19/22 : CMD ["node","index.js"]
 ---> Running in 5377c11e10be
Removing intermediate container 5377c11e10be
 ---> d6fd68cb49d2
Step 20/22 : CMD ["node","index.js"]
 ---> Running in e0904a5d8efe
Removing intermediate container e0904a5d8efe
 ---> a3a4096e202e
Step 21/22 : CMD ["node","index.js"]
 ---> Running in 13937d9a930d
Removing intermediate container 13937d9a930d
 ---> ffd0eeaa0cab
Step 22/22 : CMD ["node","index.js"]
 ---> Running in 1eec89c96e34
Removing intermediate container 1eec89c96e34
 ---> 3664f8f51bf0
Successfully built 3664f8f51bf0
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
8c6babe95164: Preparing
06007c21288d: Preparing
4fd8aa5a19d3: Preparing
1b20c3c7f8a3: Preparing
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
69368a71b175: Layer already exists
4fd8aa5a19d3: Pushed
1b20c3c7f8a3: Pushed
316cddb5fa75: Layer already exists
3f1630e3667f: Layer already exists
1bd72b149259: Layer already exists
060ee1077a8d: Layer already exists
3b385b8d2549: Layer already exists
8c6babe95164: Pushed
06007c21288d: Pushed
latest: digest: sha256:dc464e9e9362e625249735c82552fe9fb766aeb6241fc151b44d673ec724bc39 size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
3b99e92a-dff3-45aa-948e-9014e6977709  2025-10-15T15:09:51+00:00  1M60S     gs://cleanpro-site_cloudbuild/source/1760540972.650682-6d3a7c41941541899db3d113b98749dc.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy...................done
Creating Revision...................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00617-lqk' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00617-lqk&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00617-lqk%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/15.12.20.248494.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760541140.460262-dce036fec43d46cd8d5541bb89a2f028.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/f3cb0992-e7eb-4275-9089-218237c27724].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/f3cb0992-e7eb-4275-9089-218237c27724?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "f3cb0992-e7eb-4275-9089-218237c27724"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760541140.460262-dce036fec43d46cd8d5541bb89a2f028.tgz#1760541140734305
Copying gs://cleanpro-site_cloudbuild/source/1760541140.460262-dce036fec43d46cd8d5541bb89a2f028.tgz#1760541140734305...
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
 ---> Running in e58ed4d675f4
Removing intermediate container e58ed4d675f4
 ---> 8daa5322f3a2
Step 3/11 : COPY package*.json ./
 ---> bc4788531b28
Step 4/11 : RUN npm install
 ---> Running in c807eb0cbe98

added 346 packages, and audited 347 packages in 29s

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
[0mRemoving intermediate container c807eb0cbe98
 ---> 0c5d6d677d16
Step 5/11 : COPY . .
 ---> a560d5e6c64d
Step 6/11 : RUN npm run build
 ---> Running in f7586212278b

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
✓ built in 5.31s
Removing intermediate container f7586212278b
 ---> 324c017f85fd
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
621a51978ed7: Download complete
03e63548f209: Verifying Checksum
03e63548f209: Download complete
f80aba050ead: Download complete
83ce83cd9960: Download complete
e2d0ea5d3690: Verifying Checksum
e2d0ea5d3690: Download complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
f80aba050ead: Pull complete
621a51978ed7: Pull complete
76c9bcaa4163: Verifying Checksum
76c9bcaa4163: Download complete
03e63548f209: Pull complete
83ce83cd9960: Pull complete
e2d0ea5d3690: Pull complete
7fb80c2f28bc: Pull complete
76c9bcaa4163: Pull complete
Digest: sha256:61e01287e546aac28a3f56839c136b31f590273f3b41187a36f46f6a03bbfe22
Status: Downloaded newer image for nginx:alpine
 ---> 5e7abcdd2021
Step 8/11 : COPY --from=build /app/dist /usr/share/nginx/html
 ---> 12d1d580fd09
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> bcd384c6f184
Step 10/11 : EXPOSE 8080
 ---> Running in d4b580a6c0b6
Removing intermediate container d4b580a6c0b6
 ---> 40c4a50e7941
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in 95557fb91fed
Removing intermediate container 95557fb91fed
 ---> 9fb816999ef6
Successfully built 9fb816999ef6
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
67d1a8ee0059: Preparing
fa0210c3d180: Preparing
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
1704c5a3d8da: Layer already exists
e9a26559275d: Layer already exists
abbef7f88314: Layer already exists
3e4655a38876: Layer already exists
ed6be5e2fd33: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
fa0210c3d180: Pushed
67d1a8ee0059: Pushed
latest: digest: sha256:ee569fd3fac7248cdca59af34000477b980dad3207e1c25f3361a7a280e7c2b0 size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
f3cb0992-e7eb-4275-9089-218237c27724  2025-10-15T15:12:20+00:00  1M8S      gs://cleanpro-site_cloudbuild/source/1760541140.460262-dce036fec43d46cd8d5541bb89a2f028.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy.....................done
Creating Revision.......................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00194-5dh] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
[main d628e06] chore(codox): automated review & deploy report
 1 file changed, 163 insertions(+), 166 deletions(-)
To https://github.com/Tazaai/cleanpro-site
   6e25b03..d628e06  main -> main
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
⚠️ Git rebase failed — showing conflicts...
❌ Codox run detected issues — review agent.md
