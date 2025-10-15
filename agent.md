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

added 344 packages, and audited 345 packages in 37s

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
[32m✓ built in 1.87s[39m
## ☁️ Deploying backend...
▶️ Deploying Backend...
🚀 Building and deploying cleanpro-backend...
Creating temporary archive of 7645 file(s) totalling 167.1 MiB before compression.
Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760538997.009168-9a7fe4255f004c1886e8a2c9a666d613.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/18b56c50-1e8a-4216-a595-4581d4080073].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/18b56c50-1e8a-4216-a595-4581d4080073?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "18b56c50-1e8a-4216-a595-4581d4080073"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760538997.009168-9a7fe4255f004c1886e8a2c9a666d613.tgz#1760539013768146
Copying gs://cleanpro-site_cloudbuild/source/1760538997.009168-9a7fe4255f004c1886e8a2c9a666d613.tgz#1760539013768146...
/ [0 files][    0.0 B/ 22.9 MiB]                                                -- [1 files][ 22.9 MiB/ 22.9 MiB]                                                
Operation completed over 1 objects/22.9 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/gcb-internal
Sending build context to Docker daemon  181.8MB
Step 1/20 : FROM node:20
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
1b7f8e1ff922: Verifying Checksum
1b7f8e1ff922: Download complete
b44b21b18714: Verifying Checksum
b44b21b18714: Download complete
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
Step 2/20 : WORKDIR /app/backend
 ---> Running in db7918827567
Removing intermediate container db7918827567
 ---> 388b876b5aec
Step 3/20 : WORKDIR /app/backend
 ---> Running in fe96d62f6e09
Removing intermediate container fe96d62f6e09
 ---> 556af3389f98
Step 4/20 : COPY package*.json ./
 ---> 6e1eec2f9db3
Step 5/20 : RUN npm install --omit=dev
 ---> Running in 8a2b1485fd8b
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
[0mRemoving intermediate container 8a2b1485fd8b
 ---> 4bc3c94fbefa
Step 6/20 : COPY . .
 ---> a009fd006d00
Step 7/20 : ENV PORT=8080
 ---> Running in 15444c3cecb2
Removing intermediate container 15444c3cecb2
 ---> 79988095df42
Step 8/20 : ENV HOST=0.0.0.0
 ---> Running in c725bc9ea689
Removing intermediate container c725bc9ea689
 ---> fffd3f3f78a1
Step 9/20 : ENV CLOUD_RUN_TIMEOUT=1200
 ---> Running in d101c8477fa4
Removing intermediate container d101c8477fa4
 ---> fed4ae901f28
Step 10/20 : ENV CLOUD_RUN_CPU_THROTTLING=FALSE
 ---> Running in 76bc6d5a836c
Removing intermediate container 76bc6d5a836c
 ---> 84e9bd680bbd
Step 11/20 : EXPOSE 8080
 ---> Running in 73a51f794f37
Removing intermediate container 73a51f794f37
 ---> 10be264e113e
Step 12/20 : HEALTHCHECK CMD curl -f http://localhost:8080/ || exit 1
 ---> Running in 10a78d77d344
Removing intermediate container 10a78d77d344
 ---> a6096cf798a1
Step 13/20 : CMD ["node", "index.js"]
 ---> Running in cab0de55ef9c
Removing intermediate container cab0de55ef9c
 ---> 013bafd25e77
Step 14/20 : CMD ["node","index.js"]
 ---> Running in 423949660a02
Removing intermediate container 423949660a02
 ---> 9e3c5f91d79b
Step 15/20 : CMD ["node","index.js"]
 ---> Running in 6bf0525f2456
Removing intermediate container 6bf0525f2456
 ---> 05abf4295304
Step 16/20 : CMD ["node","index.js"]
 ---> Running in 59d658e07145
Removing intermediate container 59d658e07145
 ---> eb704fbd0597
Step 17/20 : CMD ["node","index.js"]
 ---> Running in e52bbae9f745
Removing intermediate container e52bbae9f745
 ---> 49634a90cc1e
Step 18/20 : CMD ["node","index.js"]
 ---> Running in bd0501ada373
Removing intermediate container bd0501ada373
 ---> 6908f86dd4e4
Step 19/20 : CMD ["node","index.js"]
 ---> Running in 1ee98e56e351
Removing intermediate container 1ee98e56e351
 ---> 8d5d865fc3ae
Step 20/20 : CMD ["node","index.js"]
 ---> Running in c864389c9de8
Removing intermediate container c864389c9de8
 ---> 8e2093680039
Successfully built 8e2093680039
Successfully tagged gcr.io/cleanpro-site/cleanpro-backend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-backend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-backend]
b89790daec42: Preparing
e59716cb42b2: Preparing
d1df617769ea: Preparing
cdbc3bcbf661: Preparing
bb9b55128ba0: Preparing
856b4ab3e742: Preparing
69368a71b175: Preparing
316cddb5fa75: Preparing
1bd72b149259: Preparing
060ee1077a8d: Preparing
3f1630e3667f: Preparing
3b385b8d2549: Preparing
1bd72b149259: Waiting
856b4ab3e742: Waiting
69368a71b175: Waiting
316cddb5fa75: Waiting
060ee1077a8d: Waiting
3f1630e3667f: Waiting
3b385b8d2549: Waiting
bb9b55128ba0: Layer already exists
856b4ab3e742: Layer already exists
69368a71b175: Layer already exists
cdbc3bcbf661: Pushed
d1df617769ea: Pushed
316cddb5fa75: Layer already exists
060ee1077a8d: Layer already exists
1bd72b149259: Layer already exists
3f1630e3667f: Layer already exists
3b385b8d2549: Layer already exists
b89790daec42: Pushed
e59716cb42b2: Pushed
latest: digest: sha256:d68a00e62c7c8be7d2fc9482e2e340a782f15af5bf0b00cc8fb61b59c41e367f size: 2846
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                           STATUS
18b56c50-1e8a-4216-a595-4581d4080073  2025-10-15T14:36:54+00:00  2M1S      gs://cleanpro-site_cloudbuild/source/1760538997.009168-9a7fe4255f004c1886e8a2c9a666d613.tgz  gcr.io/cleanpro-site/cleanpro-backend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-backend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy..........................done
Creating Revision.....................................................................................................................................................................................................................................................................................................failed
Deployment failed
ERROR: (gcloud.run.deploy) Revision 'cleanpro-backend-00615-rlg' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout. This can happen when the container port is misconfigured or if the timeout is too short. The health check timeout can be extended. Logs for this revision might contain more information.

Logs URL: https://console.cloud.google.com/logs/viewer?project=cleanpro-site&resource=cloud_run_revision/service_name/cleanpro-backend/revision_name/cleanpro-backend-00615-rlg&advancedFilter=resource.type%3D%22cloud_run_revision%22%0Aresource.labels.service_name%3D%22cleanpro-backend%22%0Aresource.labels.revision_name%3D%22cleanpro-backend-00615-rlg%22 
For more troubleshooting guidance, see https://cloud.google.com/run/docs/troubleshooting#container-failed-to-start
⚠️ Deploy failed, check Cloud Run logs
## ☁️ Deploying frontend...
🔑 Using project: cleanpro-site
Updated property [core/project].
Updated property [run/region].
🚀 Building and deploying cleanpro-frontend...
Creating temporary archive of 29 file(s) totalling 304.7 KiB before compression.
Some files were not included in the source upload.

Check the gcloud log [/home/runner/.config/gcloud/logs/2025.10.15/14.39.39.643022.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://cleanpro-site_cloudbuild/source/1760539179.855282-b7f76327fead49f5873be8369211829e.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/cleanpro-site/locations/global/builds/dd1687b9-3a76-4203-b9e7-6b7ea608b529].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/dd1687b9-3a76-4203-b9e7-6b7ea608b529?project=5539254765 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------- REMOTE BUILD OUTPUT ------------------------------
starting build "dd1687b9-3a76-4203-b9e7-6b7ea608b529"

FETCHSOURCE
Fetching storage object: gs://cleanpro-site_cloudbuild/source/1760539179.855282-b7f76327fead49f5873be8369211829e.tgz#1760539180262005
Copying gs://cleanpro-site_cloudbuild/source/1760539179.855282-b7f76327fead49f5873be8369211829e.tgz#1760539180262005...
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
 ---> Running in 46363352011b
Removing intermediate container 46363352011b
 ---> 5c302c963a0a
Step 3/11 : COPY package*.json ./
 ---> c5976db1dedd
Step 4/11 : RUN npm install
 ---> Running in 682e0ece146e

added 346 packages, and audited 347 packages in 26s

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
[0mRemoving intermediate container 682e0ece146e
 ---> 623dcda698f1
Step 5/11 : COPY . .
 ---> 78e4f3a57b83
Step 6/11 : RUN npm run build
 ---> Running in 8d5fec989499

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
✓ built in 4.37s
Removing intermediate container 8d5fec989499
 ---> 10d924576e0e
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
f80aba050ead: Download complete
83ce83cd9960: Verifying Checksum
83ce83cd9960: Download complete
03e63548f209: Verifying Checksum
03e63548f209: Download complete
e2d0ea5d3690: Verifying Checksum
e2d0ea5d3690: Download complete
f80aba050ead: Pull complete
621a51978ed7: Pull complete
7fb80c2f28bc: Verifying Checksum
7fb80c2f28bc: Download complete
03e63548f209: Pull complete
76c9bcaa4163: Verifying Checksum
76c9bcaa4163: Download complete
83ce83cd9960: Pull complete
e2d0ea5d3690: Pull complete
7fb80c2f28bc: Pull complete
76c9bcaa4163: Pull complete
Digest: sha256:61e01287e546aac28a3f56839c136b31f590273f3b41187a36f46f6a03bbfe22
Status: Downloaded newer image for nginx:alpine
 ---> 5e7abcdd2021
Step 8/11 : COPY --from=build /app/dist /usr/share/nginx/html
 ---> 56fb6c350c39
Step 9/11 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 144d7a01409c
Step 10/11 : EXPOSE 8080
 ---> Running in 470536a75acd
Removing intermediate container 470536a75acd
 ---> 94de7d2391df
Step 11/11 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in bb2b7eb33e2a
Removing intermediate container bb2b7eb33e2a
 ---> f6386ca6b439
Successfully built f6386ca6b439
Successfully tagged gcr.io/cleanpro-site/cleanpro-frontend:latest
PUSH
Pushing gcr.io/cleanpro-site/cleanpro-frontend
The push refers to repository [gcr.io/cleanpro-site/cleanpro-frontend]
2331c7c2d5e4: Preparing
798ff7dc1101: Preparing
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
abbef7f88314: Layer already exists
ed6be5e2fd33: Layer already exists
1967fccdbe5e: Layer already exists
256f393e029f: Layer already exists
2331c7c2d5e4: Pushed
798ff7dc1101: Pushed
latest: digest: sha256:614423fddfbeb34472982072d0c31671f4462e53b0c3a96428f30df4ea59dc1c size: 2406
DONE
--------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                                                                                       IMAGES                                            STATUS
dd1687b9-3a76-4203-b9e7-6b7ea608b529  2025-10-15T14:39:40+00:00  1M6S      gs://cleanpro-site_cloudbuild/source/1760539179.855282-b7f76327fead49f5873be8369211829e.tgz  gcr.io/cleanpro-site/cleanpro-frontend (+1 more)  SUCCESS
Deploying container to Cloud Run service [cleanpro-frontend] in project [cleanpro-site] region [europe-west1]
Deploying...
Setting IAM Policy......................done
Creating Revision...................................................................................................done
Routing traffic.....done
Done.
Service [cleanpro-frontend] revision [cleanpro-frontend-00192-kmv] has been deployed and is serving 100 percent of traffic.
Service URL: https://cleanpro-frontend-5539254765.europe-west1.run.app
✅ Frontend deployed successfully!
## 🩺 Health test...
✅ CleanPro Backend is running✅ Backend healthy
## 📦 Commit diagnostic report...
[main 186f3f0] chore(codox): automated review & deploy report
 1 file changed, 155 insertions(+), 158 deletions(-)
To https://github.com/Tazaai/cleanpro-site
   5d15e98..186f3f0  main -> main
error: cannot pull with rebase: You have unstaged changes.
error: Please commit or stash them.
⚠️ Git rebase failed — showing conflicts...
❌ Codox run detected issues — review agent.md
