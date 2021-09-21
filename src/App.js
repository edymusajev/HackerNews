import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { Navbar } from './Navbar';
// import { SinglePostPage } from './pages/SinglePostPage';
// import { FeedPage } from './pages/FeedPage';
const SinglePostPage = React.lazy(() => import('./pages/SinglePostPage'));
const FeedPage = React.lazy(() => import('./pages/FeedPage'));

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white ">
      <Navbar />
      <div className="">
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" component={FeedPage} />

            <Route path="/posts/:id" component={SinglePostPage} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
