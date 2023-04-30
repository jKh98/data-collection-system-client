
<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>
data-collection-system-client
</h1>
<h3 align="center">📍 Data Collection System Client: Collect data easily and efficiently.</h3>
<h3 align="center">🚀 Developed with the software and tools below.</h3>
<p align="center">

<img src="https://img.shields.io/badge/Markdown-000000.svg?style=for-the-badge&logo=Markdown&logoColor=white" alt="" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="stringify-object" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white" alt="compute-scroll-into-view" />
<img src="https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black" alt="jest-circus" />
<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=for-the-badge&logo=Lodash&logoColor=white" alt="markdown" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black" alt="oauth-1.0a" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white" alt="postcss-merge-longhand" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=for-the-badge&logo=PostCSS&logoColor=white" alt="common-tags" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=for-the-badge&logo=Webpack&logoColor=black" alt="entities" />
<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style=for-the-badge&logo=SemVer&logoColor=white" alt="rc-textarea" />

<img src="https://img.shields.io/badge/SVGO-3E7FC1.svg?style=for-the-badge&logo=SVGO&logoColor=white" alt="eslint-plugin-import" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white" alt="commondir" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=for-the-badge&logo=JSON&logoColor=white" alt="react-refresh" />
<img src="https://img.shields.io/badge/Puppeteer-40B5A4.svg?style=for-the-badge&logo=Puppeteer&logoColor=white" alt="react-router-dom" />
<img src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white" alt="sax" />
<img src="https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white" alt="rc-steps" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=for-the-badge&logo=Autoprefixer&logoColor=white" alt="jest-environment-node" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="read-cache" />
<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style=for-the-badge&logo=Ajv&logoColor=white" alt="anymatch" />
<img src="https://img.shields.io/badge/Immer-00E7C3.svg?style=for-the-badge&logo=Immer&logoColor=white" alt="kind-of" />
</p>

</div>

---

## 📚 Table of Contents

- [📚 Table of Contents](#-table-of-contents)
- [📍Overview](#-introdcution)
- [🔮 Features](#-features)
- [⚙️ Project Structure](#project-structure)
- [🧩 Modules](#modules)
- [🏎💨 Getting Started](#-getting-started)
- [🗺 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)

---

## 📍Overview

This project allows for the collection of data from a variety of sources and automatically loads it into a database.

## 🔮 Feautres

> `[📌  INSERT-PROJECT-FEATURES]`

---

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-github-open.svg" width="80" />

## ⚙️ Project Structure

```bash
repo
├── README.md
├── config-overrides.js
├── firebase.json
├── functions
│   ├── global.d.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   ├── utils.ts
│   │   └── workers.ts
│   ├── tsconfig.json
│   └── ui-debug.log
├── global.d.ts
├── package.json
├── public
│   ├── 404.html
│   ├── favicon.ico
│   ├── firebase-messaging-sw.js
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── DataRow
│   │   │   └── index.tsx
│   │   ├── DataSource
│   │   │   └── index.tsx
│   │   ├── DatePicker
│   │   │   └── index.ts
│   │   ├── DateTime
│   │   │   └── index.tsx
│   │   ├── Kpi
│   │   │   └── index.tsx
│   │   ├── Layout
│   │   │   ├── Content.tsx
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── Page
│   │   │   ├── BackButton.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── index.ts
│   │   ├── ProtectedRoute
│   │   │   └── index.tsx
│   │   └── Splash
│   │       └── index.tsx
│   ├── config
│   │   └── firebase.ts
│   ├── constants
│   │   ├── colors.ts
│   │   ├── icons.tsx
│   │   ├── paths.ts
│   │   └── tooltips.ts
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── auth
│   │   │   ├── Account.tsx
│   │   │   ├── Login.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── jobs
│   │   │   ├── EditJob.tsx
│   │   │   ├── Job.tsx
│   │   │   ├── JobActions.tsx
│   │   │   ├── JobsKpis.tsx
│   │   │   ├── JobsList.tsx
│   │   │   ├── NewJob.tsx
│   │   │   └── forms
│   │   │       ├── JobForm.tsx
│   │   │       ├── NewsApiForm.tsx
│   │   │       ├── RedditApiForm.tsx
│   │   │       └── TwitterApiForm.tsx
│   │   └── results
│   │       ├── Result.tsx
│   │       ├── ResultsKpis.tsx
│   │       └── ResultsList.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── serviceWorker.ts
│   ├── setupTests.ts
│   └── utils
│       ├── datePicker.ts
│       ├── schedule.ts
│       └── transform.ts
├── tsconfig.json
├── tsconfig.paths.json
└── yarn.lock

23 directories, 69 files
```

---

<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-src-open.svg" width="80" />

## 💻 Modules

<details closed><summary>Auth</summary>

| File              | Summary                                                                                                                                                                               | Module                           |
|:------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|
| Login.tsx         | This code is a login form for the DataFetchr app . It includes fields for email and password , as well as a link to the password reset page . The form uses the antd design library . | src/pages/auth/Login.tsx         |
| Account.tsx       | This code creates a summary of a user 's account details including their ID , email , name , and when they were last signed in .                                                      | src/pages/auth/Account.tsx       |
| ResetPassword.tsx | This code is a form for resetting a password . It takes the user 's email address and sends a password reset email .                                                                  | src/pages/auth/ResetPassword.tsx |

</details>

<details closed><summary>Config</summary>

| File        | Summary                                                                                                                                                                                                                         | Module                 |
|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------|
| firebase.ts | This code imports the Firebase library and initializes it with the provided configuration . It then exports the authentication , Firestore , and messaging modules .                                                            | src/config/firebase.ts |

</details>

<details closed><summary>Constants</summary>

| File      | Summary                                                                                                                                 | Module                  |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------|:------------------------|
| colors.ts | This code creates an object that maps job statuses to colors .                                                                          | src/constants/colors.ts |
| icons.tsx | This code imports icons from the Ant Design library to be used as status indicators . The icons are assigned to specific job statuses . | src/constants/icons.tsx |
| paths.ts  | This code creates an enum with six different paths .                                                                                    | src/constants/paths.ts  |
| tooltips.ts | This code exports two constants , LUCENE_QUERY_SYNTAX_QUERY_TOOLTIP and TWITTER_QUERY_SYNTAX_QUERY_TOOLTIP . These constants are strings that contain information on how to use Lucene Query Syntax and Twitter Query Syntax to | src/config/tooltips.ts |

</details>

<details closed><summary>Datarow</summary>

| File      | Summary                                                                                                                                                                                                                                                                                                                                 | Module                           |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|
| index.tsx | This code creates a DataRow component that takes a title and value props . It uses the antd design library to create a two column layout for the data . The title is displayed in the left column in a smaller , secondary font . The value is displayed in the right column . There is a margin bottom applied to the row so that each | src/components/DataRow/index.tsx |

</details>

<details closed><summary>Datasource</summary>

| File      | Summary                                                                                                                                                                                                                          | Module                              |
|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------|
| index.tsx | This code defines a React component for displaying icons corresponding to different data sources . The icons are imported from the Ant Design library , and the component accepts a size prop to control the size of the icons . | src/components/DataSource/index.tsx |

</details>

<details closed><summary>Datepicker</summary>

| File     | Summary                                                                                                                                                                                                                                               | Module                             |
|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------|
| index.ts | This code imports the generatePicker function from the date - picker module in the antd library , and uses it to create a DatePicker component . The DatePicker component is then exported so that it can be used in other parts of the application . | src/components/DatePicker/index.ts |

</details>

<details closed><summary>Datetime</summary>

| File      | Summary                                                                                                                                                               | Module                            |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------|
| index.tsx | This code is a React component that takes a timestamp as a prop and formats it as a date and time string . If the timestamp is not provided , it will return a dash . | src/components/DateTime/index.tsx |

</details>

<details closed><summary>Forms</summary>

| File               | Summary                                                                                                                                                                                                                                                                                                               | Module                                  |
|:-------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------|
| RedditApiForm.tsx  | This code creates a form for a user to input a query , subreddit , time period , and limit . The code uses the React library and the Ant Design library .                                                                                                                                                             | src/pages/jobs/forms/RedditApiForm.tsx  |
| JobForm.tsx        | This code is a React component that renders a form for creating or editing a " SearchJob " object . The form includes fields for the job 's name , description , schedule , and sources . The code also includes a button for cancelling the form , and a submit button that is disabled if no sources are selected . | src/pages/jobs/forms/JobForm.tsx        |
| TwitterApiForm.tsx | This code creates a form for a user to input a query , the max number of results , the type of tweets , and the date .                                                                                                                                                                                                | src/pages/jobs/forms/TwitterApiForm.tsx |
| NewsApiForm.tsx    | This code creates a form for the user to input a query , sources , domains , exclude domains , from date , to date , and language . The form uses the Ant Design UI library .                                                                                                                                         | src/pages/jobs/forms/NewsApiForm.tsx    |

</details>

<details closed><summary>Functions</summary>

| File         | Summary                                                                                                                                                                                                                                                                                                                                                     | Module                 |
|:-------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------|
| ui-debug.log | This code starts a web server at 127. 0. 0. 1:4000 or : : 1:4000 .                                                                                                                                                                                                                                                                                          | functions/ui-debug.log |
| global.d.ts  | This code defines an interface for a search job , which includes a search query and schedule . The search query can include parameters for different data sources , and the schedule can include an interval and unit . The code also defines a search result interface , which includes fields for data such as the title , content , and published date . | functions/global.d.ts  |

</details>

<details closed><summary>Jobs</summary>

| File           | Summary                                                                                                                                                                                                                                                                                                   | Module                        |
|:---------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------|
| EditJob.tsx    | This code renders a form for editing a job . The job data is retrieved from a firebase database and the form is populated with the existing data . The user can make changes to the data and submit the form to update the job in the database .                                                          | src/pages/jobs/EditJob.tsx    |
| NewJob.tsx     | This code creates a new job using the JobForm component . The new job is added to the jobs collection in Firebase .                                                                                                                                                                                       | src/pages/jobs/NewJob.tsx     |
| JobActions.tsx | This code creates a dropdown button with actions that a user can take on a job . The actions include editing the job , starting the job , and stopping the job . The code also includes functionality for when the user clicks on one of the actions .                                                    | src/pages/jobs/JobActions.tsx |
| JobsKpis.tsx   | This code creates a JobsKpis component that displays job data in the form of KPIs . The KPIs show the total number of jobs , the number of active jobs , the number of stopped jobs , and the number of running jobs . The code also includes a suffix that shows the total number of jobs for each KPI . | src/pages/jobs/JobsKpis.tsx   |
| JobsList.tsx   | This code renders a list of jobs for the current user , including information about each job 's schedule , status , and last run time . The user can also search for jobs by i d , name , or description .                                                                                                | src/pages/jobs/JobsList.tsx   |
| Job.tsx        | This code renders a job details page , including information about the job and its schedule , as well as a list of results .                                                                                                                                                                              | src/pages/jobs/Job.tsx        |

</details>

<details closed><summary>Kpi</summary>

| File      | Summary                                                       | Module                       |
|:----------|:--------------------------------------------------------------|:-----------------------------|
| index.tsx | This code is a loading skeleton for a card with a statistic . | src/components/Kpi/index.tsx |

</details>

<details closed><summary>Layout</summary>

| File        | Summary                                                                                                                                                                                                                                                                                     | Module                            |
|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------|
| Content.tsx | This code creates a content area for a page , with some default styling . The content area will take up the entire page minus the 64px for the header , and will have a scrollbar if the content is too long .                                                                              | src/components/Layout/Content.tsx |
| Header.tsx  | This code creates a header component for a website that includes a link to the home page , an icon , and a dropdown menu . The dropdown menu includes options for an account page and logging out . The header also includes a text component with a message about the website 's content . | src/components/Layout/Header.tsx  |
| index.ts    | This code exports the Content and Header components from the . /Content and . /Header files , respectively .                                                                                                                                                                                | src/components/Layout/index.ts    |

</details>

<details closed><summary>Page</summary>

| File           | Summary                                                                                                                                                                                              | Module                             |
|:---------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------|
| BackButton.tsx | This code creates a back button that , when clicked , takes the user to the previous page .                                                                                                          | src/components/Page/BackButton.tsx |
| PageHeader.tsx | This code creates a header for a page that includes a back button , title , and optional extra content . The header is centered and includes space for the back button , title , and extra content . | src/components/Page/PageHeader.tsx |
| index.ts       | This code exports the PageHeader component from the . /PageHeader file .                                                                                                                             | src/components/Page/index.ts       |

</details>

<details closed><summary>Protectedroute</summary>

| File      | Summary                                                                                                                                 | Module                                  |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------|
| index.tsx | This code is a protected route that will only allow access if the validator is true . If not , it will redirect to the fallback route . | src/components/ProtectedRoute/index.tsx |

</details>

<details closed><summary>Public</summary>

| File                     | Summary                                                                                                                                                                                                                                                                                                 | Module                          |
|:-------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------|
| favicon.ico              | This code is an error message that appears when trying to decode a file that is not text or UTF-8 .                                                                                                                                                                                                     | public/favicon.ico              |
| index.html               | This code is the HTML template for the DataFetchr web app . It includes links to the manifest. json file and the favicon. ico file , as well as a meta tag for the description of the app . The title of the app is also included in the head section . The body of the template includes a div with an | public/index.html               |
| firebase-messaging-sw.js | This code imports the Firebase App and Messaging SDKs into the service worker . It initializes the app with the configuration object passed in as a URL parameter , and then starts the Firebase Messaging service .                                                                                    | public/firebase-messaging-sw.js |
| 404.html                 | This code is a 404 error page . It is displayed when a user tries to access a page that does not exist . The page is generated by the Firebase Command - Line Interface .                                                                                                                               | public/404.html                 |
| robots.txt               | This code is a robots. txt file that tells web robots ( also known as web crawlers or web spiders ) which pages on a website to crawl .                                                                                                                                                                 | public/robots.txt               |

</details>

<details closed><summary>Results</summary>

| File            | Summary                                                                                                                                                                                                                                                                                     | Module                            |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------|
| ResultsList.tsx | This code imports React , { Fragment , useMemo } from " react " ;                                                                                                                                                                                                                           | src/pages/results/ResultsList.tsx |
|                 |  import { useAuthState } from " react - firebase - hooks / auth " ;                                                                                                                                                                                                                         |                                   |
|                 |  import { useCollection } from " react - firebase - hooks / firestore " ;                                                                                                                                                                                                                   |                                   |
|                 |  import { generatePath , useNavigate } from " react                                                                                                                                                                                                                                         |                                   |
| ResultsKpis.tsx | This code creates a component to display KPIs for a search . The KPIs include the total number of results , the percentage of results from each data source , and the number of results from each data source . The code also includes a loading state for when the data is being fetched . | src/pages/results/ResultsKpis.tsx |
| Result.tsx      | This code renders a search result from a job search . The result includes the job title , description , URL , published date , and created / updated timestamp . If available , there is also a link to download a PDF of the job listing .                                                 | src/pages/results/Result.tsx      |

</details>

<details closed><summary>Root</summary>

| File                | Summary                                                                                                                                                                                                                                                                                                                                                      | Module              |
|:--------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|
| .firebaserc         | This code contains a list of projects and their corresponding default settings .                                                                                                                                                                                                                                                                             | .firebaserc         |
| config-overrides.js | This code is a module that overrides the webpack config . It sets up aliases for various directories so that they can be imported more easily .                                                                                                                                                                                                              | config-overrides.js |
| global.d.ts         | This code defines an interface for a search job , which includes a search query and schedule . The search query can include parameters for different data sources , and the schedule can include an interval and unit . The code also defines a search result interface , which includes fields for a job i d , title , content , url , and published date . | global.d.ts         |

</details>

<details closed><summary>Splash</summary>

| File      | Summary                                                      | Module                          |
|:----------|:-------------------------------------------------------------|:--------------------------------|
| index.tsx | This code creates a loading spinner using the antd library . | src/components/Splash/index.tsx |

</details>

<details closed><summary>Src (React)</summary>

| File               | Summary                                                                                                                                                                                                                                                                                                                      | Module                   |
|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------|
| index.tsx          | This code imports React and ReactDOM , and sets up a React Router . It renders the App component inside a BrowserRouter . Finally , it registers a service worker and reports web vitals .                                                                                                                                   | src/index.tsx            |
| App.tsx            | This code is a React application that uses Firebase for authentication and messaging . The app has routes for a login page , a reset password page , a jobs list page , a job detail page , an edit job page , a new job page , and a results page . The app also has a protected route component that checks if the user is | src/App.tsx              |
| serviceWorker.ts   | This code registers a service worker for a web app .                                                                                                                                                                                                                                                                         | src/serviceWorker.ts     |
| index.css          | The code imports the Muli font from Google Fonts and applies it to the entire document . It also makes sure that the font is applied correctly in webkit browsers . Finally , it sets some basic CSS rules for the document .                                                                                                | src/index.css            |
| reportWebVitals.ts | This code imports the web - vitals library and creates a function that will report various performance metrics . The function takes an optional parameter , which should be a function that will handle the performance data .                                                                                               | src/reportWebVitals.ts   |
| react-app-env.d.ts | This code is a reference to the types of react - scripts .                                                                                                                                                                                                                                                                   | src/react-app-env.d.ts   |

</details>


<details closed><summary>Src (Functions)</summary>

| File               | Summary                                                                                                                                                                                                                                                                                                                      | Module                   |
|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------|
| workers.ts         | This code imports the axios library and the dotenv library . It also imports the auth and idToHash functions from the utils file . The code then sets up a function to search the News API using the axios library . The code also sets up a function to search the Twitter API using the axios library . The code also      | functions/src/workers.ts |
| index.ts           | This code is a job scheduler for a search engine . It queries the database for jobs that are ready to be run , then runs them concurrently . Finally , it kills the browser .                                                                                                                                                | functions/src/index.ts   |
| auth.ts            | This code is an example of how to use the OAuth1a library to generate an authorization header for the Twitter API .                                                                                                                                                                                                          | functions/
</details>
<hr />

## 🚀 Getting Started

### ✅ Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. (functions require Node v16)
- Firebase CLI - [Download & Install Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)
- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Yarn - [Download & Install Yarn](https://yarnpkg.com/en/docs/install#windows-stable). Yarn is a performant package manager for JavaScript and replaces the npm client. It is not strictly necessary, but highly encouraged.
### 💻 Installation

1. Clone the data-collection-system-client repository:

    ```sh
    git clone https://github.com/jKh98/data-collection-system-client
    ```

2. Change to the project directory:

    ```sh
    cd data-collection-system-client
    ```

3. Install the dependencies:

    ```sh
    npm install 
    ```
    
or 

    ```sh
    yarn install 
    ```

4. Run the app:

    ```sh
    npm start
    ```

5. To deploy the app and functions to firebase:

    ```sh
    npm run deploy
    ```

6. To install firebase functions:

    ```sh
    cd functions && npm install
    ```

7. To run firebase functions locally:

    ```sh
    cd functions && npm run serve
    ```

8. To deploy firebase functions only:

    ```sh
    cd functions && npm run deploy
    ```



### 🤖 Using data-collection-system-client

```sh
npm run build
```

### 🧪 Running Tests

```sh
#run tests
```

<hr />

## 🛠 Future Development

- [X] [📌  COMPLETED-TASK]
- [ ] [📌  INSERT-TASK]
- [ ] [📌  INSERT-TASK]

---

