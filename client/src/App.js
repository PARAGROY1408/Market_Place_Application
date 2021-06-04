import 'antd/dist/antd.css';
import Home from './booking/Home'
import Login from './auth/Login'
import Register from './auth/Register' //the  export is default so we dont need to destructure
import Dashboard from './user/Dashboard'
import DashboardSeller from './user/DashboardSeller'
import NewHotel from './hotels/NewHotel'
import EditHotel from './hotels/EditHotel'
import ViewHotels from './hotels/ViewHotels'
import SearchResult from './hotels/SearchResult'
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom' // as it is not a default export so we need to detsructure that is use {}
import TopNav from './components/TopNav'
import { ToastContainer, toast } from 'react-toastify'; // show the message that is coming from the backend..
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <BrowserRouter>
    <TopNav></TopNav>
    <ToastContainer position="top-center"></ToastContainer>
    <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
        <PrivateRoute exact path="/dashboard">
          <Dashboard></Dashboard>
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/seller">
          <DashboardSeller></DashboardSeller>
        </PrivateRoute>
        <PrivateRoute exact path="/hotel/new">
          <NewHotel></NewHotel>
        </PrivateRoute>
        <PrivateRoute exact path="/hotel/edit/:hotelId">
          <EditHotel></EditHotel>
        </PrivateRoute>
        <Route exact path="/hotel/:hotelId">
          <ViewHotels></ViewHotels>
        </Route>
        <Route exact path="/search-result">
          <SearchResult></SearchResult>
        </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
