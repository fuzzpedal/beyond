# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Create a `.env` file with the necessary variables

```
API_BASE_URL = 'https://api.wonde.com/v1.0'
AUTH_TOKEN = '<AUTH TOKEN HERE>'
SCHOOL_ID = '<SCHOOL ID HERE>'
```

## Step 2: Install packages

```bash
yarn
npx pod-install
```

## Step 3: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```
