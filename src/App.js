import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { Navbar } from './Navbar';
const SinglePostPage = React.lazy(() => import('./pages/SinglePostPage'));
const FeedPage = React.lazy(() => import('./pages/FeedPage'));

function App() {
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
