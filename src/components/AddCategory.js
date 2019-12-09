import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      books: [
        {title: '', price: ''}
      ],
      hasError: false
    }
  }

  componentDidMount() {
    const { editBooks } = this.props;
    if(editBooks) {
      this.setState({categoryName: editBooks[0]['category'], books: editBooks});
    }
  }

  hasEmptyFields = () => {
    return !this.state.categoryName || this.state.books.some(book => !(book.title && book.price));
  }

  addMore = () => {
    const books = [...this.state.books];
    books.push({title: '', price: ''});
    this.setState({books: books});
  }

  removeBook = (index) => {
    this.setState((prevState) => ({
      books: prevState.books.filter((b, i) => i !== index)
    }));
  }

  closeModal = (e) => {
    if(e.currentTarget.name === 'save') {
      if(this.hasEmptyFields()) {
        this.setState({hasError: true});
        return;
      }

      const { categoryName, books } = this.state;
      const newBooks = books.map(book => {
        book['category'] = categoryName;
        book['price'] = parseFloat(book['price']);
        return book;
      });

      this.props.addCategory(newBooks, categoryName);
    }
    this.props.toggleModal();
  }

  handleChange = (e) => {
    if(this.state.hasError) {
      this.setState({hasError: false});
    }

    if(['title', 'price'].includes(e.currentTarget.name)) {
      const books = [...this.state.books];
      books[e.target.dataset.id][e.currentTarget.name] = e.currentTarget.value;
      this.setState({books: books});
    } else {
      this.setState({categoryName: e.target.value});
    }
  }

  render() {
    const { isModal, toggleModal} = this.props;
    const { books } = this.state;

    return (
      <Modal isOpen={isModal} toggle={toggleModal} size={'lg'}>
        <ModalHeader toggle={toggleModal}>Add Category</ModalHeader>

        <ModalBody>

          <Form>
            <Row>
              <Col md={6}>
                <Input type="text" placeholder="Enter Category" value={this.state.categoryName} onChange={this.handleChange}/>
              </Col>
            </Row>

            <Label className="my-2">Add Books</Label>

            {books.map((book, i) => {
              return (
                <Row className="my-2" key={i}>
                  <Col md={5}>
                    <Input type="text" name="title" data-id={i} placeholder="Title" value={book.title} onChange={this.handleChange}/>
                  </Col>

                  <Col md={5}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" name="price" data-id={i} placeholder="Price" value={book.price} onChange={this.handleChange}/>
                    </InputGroup>
                  </Col>

                  <Col md={2}>
                    {(books.length - 1 === i) ?
                      <>
                        <Button color="success" onClick={this.addMore}><i className="fas fa-plus"></i></Button>
                      </>
                      :
                      <>
                        <Button color="danger" onClick={(e) => this.removeBook(i)}><i className="fas fa-minus"></i></Button>
                      </>
                    }
                  </Col>
                </Row>
              )
            })}
          </Form>

          {this.state.hasError &&
            <p className="text-danger">All fields are required</p>
          }

        </ModalBody>

        <ModalFooter>
          <Button color="primary" name="save" onClick={this.closeModal}>Save</Button>{' '}
          <Button color="secondary" name="cancel" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>

      </Modal>
    );
  }
}

export default AddCategory;
