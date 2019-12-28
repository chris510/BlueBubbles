# Blue Bubbles

Chat App using React, Express, Node, Socket.io. React hooks practice.
  
## General Information

Always wanted to learn how chats work and also wanted to learn more about react hooks so what better way to learn than to practice building a known app. Also wanted to learn more about react's styled components and Socket.io.

## Example of React Hooks!

React Class:

``` javascript
const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const dispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, dispatchToProps)(NavBar);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLink = this.getLink.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }
}
```
React Hook:

```javascript
const NavBar = () => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  }
}

```
