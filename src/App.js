import React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar } from './Navbar';
import { SinglePostPage } from './pages/SinglePostPage';
import { FeedPage } from './pages/FeedPage';

function App() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white ">
      <Navbar />
      <div className="">
        <Switch>
          <Route exact path="/" component={FeedPage} />
          <Route path="/item/:id" component={SinglePostPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
