import React from 'react';
import { Route, Switch } from 'react-router';
import { NewsPage } from './NewsPage';
import { Navbar } from './Navbar';
import { SinglePostPage } from './pages/SinglePostPage';

function App() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white ">
      <Navbar />
      <div className="">
        <Switch>
          <Route exact path="/" component={NewsPage} />
          <Route path="/item/:id" component={SinglePostPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
