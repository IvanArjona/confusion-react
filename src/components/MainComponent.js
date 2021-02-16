import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.find((dish) => dish.featured)}
                    promotion={this.state.promotions.find((promotion) => promotion.featured)}
                    leader={this.state.leaders.find((leader) => leader.featured)}
                />
            );
        }

        const DishWithId = ({ match }) => {
            const dishId = parseInt(match.params.dishId, 10);
            const dish = this.state.dishes.find((dish) => dish.id === dishId);
            const comments = this.state.comments.filter((comment) => comment.dishId === dishId)

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
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
