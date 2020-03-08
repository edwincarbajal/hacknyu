import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Formik } from 'formik';

class Wizard extends Component {
  static Page = ({ children }) => children;
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    }
  }

  next = values => this.setState(state => ({
    page: Math.min(state.page + 1, this.props.children.length - 1),
    values,
  }));

  previous = () => this.setState(state => ({
    page: Math.max(state.page - 1, 0),
  }));

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      this.setState(state => ({ values }));
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <Form size="massive" onSubmit={handleSubmit}>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <Button
                  type="button"
                  className="secondary"
                  onClick={this.previous}
                >
                  « Previous
                </Button>
              )}

              {!isLastPage && <Button type="submit">Next »</Button>}
              {isLastPage && (
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              )}
            </div>
          </Form>
        )}
      />
    );
  }
}
export default Wizard
