import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.find((dish) => dish.featured)}
                    promotion={this.props.promotions.find((promotion) => promotion.featured)}
                    leader={this.props.leaders.find((leader) => leader.featured)}
                />
            );
        }

        const DishWithId = ({ match }) => {
            const dishId = parseInt(match.params.dishId, 10);
            const dish = this.props.dishes.find((dish) => dish.id === dishId);
            const comments = this.props.comments.filter((comment) => comment.dishId === dishId)

            return (
                <DishDetail
                    dish={dish}
                    comments={comments}
                />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/contactus" component={Contact} />
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
