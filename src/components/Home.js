import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import Categories from './Categories';
import CategoryDetail from './CategoryDetail';
import AddCategory from './AddCategory';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      books: [
        {
          title : 'The Outsider',
          category: 'Novel',
          price: 12.78
        },
        {
          title: 'Still Me',
          category: 'Fiction',
          price: 12.21
        },
        {
          title: 'Circe',
          category: 'Fantasy',
          price: 11.89
        },
        {
          title: 'Vengeful',
          category: 'Science Fiction',
          price: 17.45
        },
        {
          title: 'The Good Neighbor',
          category: 'Biography',
          price: 13.66
        },
        {
          title: 'To Kill a Mockingbird',
          category: 'Fiction',
          price: 8.99
        },
        {
          title: 'The Name of the Wind',
          category: 'Fantasy',
          price: 12.99
        },
        {
          title: 'Brave New World',
          category: 'Science Fiction',
          price: 11.66
        },
        {
          title: 'The Diary of a Young Girl',
          category: 'Biography',
          price: 14.66
        },
        {
          title: 'Deception Point',
          category: 'Novel',
          price: 8.99
        }
      ]
    }
  }

  toggleModal = () => {
    this.setState({isModal: !this.state.isModal});
  }

  addCategory = (newBooks, category) => {
    this.setState((prevState) => ({
      books: [...prevState.books.filter(b => b.category !== category), ...newBooks]
    }));
  }

  deleteCategory = (category) => {
    this.setState((prevState) => ({
      books: prevState.books.filter(book => book['category'] !== category)
    }));
    
    if(category === this.state.filter) {
      this.setState({filteredBooks: null, filter: ''});
    }
  }

  editCategory = (category) => {
    this.setState((prevState) => ({
      editBooks: prevState.books.filter(book => book['category'] === category)
    }));
    this.toggleModal();
  }

  setFilter = (filter) => {
    const filteredBooks = this.state.books.filter(book => book.category === filter);
    this.setState({filteredBooks: filteredBooks, filter: filter});
  }

  render() {
    const { books } = this.state;

    return (
      <div className="container p-5">

        <Row>
          <Col>
            <h3>Inventory Management System</h3>
          </Col>
          <Col>
            <Button className="btn float-right" color="primary" onClick={this.toggleModal}>Add Category</Button>
          </Col>
        </Row>

        <Categories
          books={books}
          setFilter={this.setFilter}
          editCategory={this.editCategory}
          deleteCategory={this.deleteCategory}
        />


        {this.state.filteredBooks &&
          <CategoryDetail
            books={this.state.filteredBooks}
            category={this.state.filter}
          />
        }

        {this.state.isModal &&
          <AddCategory
            isModal={this.state.isModal}
            toggleModal={this.toggleModal}
            addCategory={this.addCategory}
            editBooks={this.state.editBooks}
          />
        }

      </div>
    )
  }
}

export default Home;
