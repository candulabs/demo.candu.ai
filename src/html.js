import React from 'react';

const JS_NPM_URLS = [
  'https://unpkg.com/docsearch.js@2.4.1/dist/cdn/docsearch.min.js',
];
const scriptHTML = `
const hasStorage = () => window && window.localStorage;

const makeId = length => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const get = key => () => {
  if (hasStorage()) {
    const value = window.localStorage.getItem(key);
    if (value) {
      try {
        // fail gracefully in case a customer tampered with the localStorage
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
  }
  return undefined;
};

const set = key => value => {
  if (hasStorage() && value !== null && value !== undefined) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};


    const userKey = 'candu_demo_session_id';
    let userId = get(userKey)();
    if (!userId) {
      userId = makeId(10);
      set(userKey)(userId);
    }


  window.canduClient = new Candu.Client({
    clientToken: 'v5Qz2pCeYP',
    userId,
    primaryColor: '#61dafb',
    secondaryColor: '#61dafb'
  });
`;

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          {JS_NPM_URLS.map(url => (
            <link key={url} rel="preload" href={url} as="script" />
          ))}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          {this.props.headComponents}
          <script src="https://cdn.candu.ai/assets/candu-client.min.js" />
          <script dangerouslySetInnerHTML={{__html: scriptHTML}} />
        </head>
        <body {...this.props.bodyAttributes}>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{__html: this.props.body}}
          />
          {this.props.postBodyComponents}
          {JS_NPM_URLS.map(url => (
            <script key={url} src={url} />
          ))}
        </body>
      </html>
    );
  }
}
