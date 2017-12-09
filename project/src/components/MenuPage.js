import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import editIcon from '../img/edit-icon.svg';

export default class MenuPage extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: {},
            accountPrivilege: ''
        };
    }

    componentWillMount() {
        this.menu = firebase.database().ref('menu/')
        this.menu.on('value', snapshot => this.setState({ menuItems: snapshot.val() }));
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.userRef = firebase.database().ref('users').child(user.uid);
                this.userRef.on('value', snapshot => {
                    let privilege = snapshot.val();
                    if (privilege !== null) {
                        this.setState({ accountPrivilege: privilege.privilege });
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.userRef) {
            this.userRef.off();
        }
        this.authUnsub();
    }

    render() {
        return (
            <div className="menu-view bg-light py-2">
                <h1 className="my-2 text-center selection-1 barlow">T h e  &nbsp; <span className="udon-red">S e l e c t i o n</span></h1>
                {this.state.accountPrivilege === 'admin' ? <AddMenuItem /> : undefined}
                {
                    this.state.menuItems ?
                        <div>
                            {
                                this.state.menuItems.udon ? <div>
                                    <h3 className="text-center selection-2 barlow font-weight-light"><span className="font-weight-bold udon-red">NOODLES</span> for every occasion</h3>
                                    <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                                        {
                                            Object.keys(this.state.menuItems.udon).map((key, index) =>
                                                <MenuItem
                                                    key={index}
                                                    itemKey={key}
                                                    category={'udon'}
                                                    privilege={this.state.accountPrivilege}
                                                    itemName={this.state.menuItems.udon[key].itemName}
                                                    japaneseName={this.state.menuItems.udon[key].japaneseName}
                                                    description={this.state.menuItems.udon[key].description}
                                                    itemPrice={this.state.menuItems.udon[key].itemPrice}
                                                    imageSource={this.state.menuItems.udon[key].imageSource}
                                                    imageName={this.state.menuItems.udon[key].imageName}
                                                />
                                            )
                                        } </div>
                                </div> : undefined
                            }
                            <br />
                            <br />
                            {
                                this.state.menuItems.side ? <div>
                                    <h3 className="text-center selection-2 barlow font-weight-light">
                                        <img className="plus-icon" src="https://firebasestorage.googleapis.com/v0/b/info343-final-project-b0d70.appspot.com/o/plus.png?alt=media&token=532def02-8ba4-4b00-ab3e-b8740d10716c" alt="plus" />
                                        your favorite <span className="font-weight-bold udon-red">TOPPINGS & SIDES</span>
                                    </h3>
                                    <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                                        {
                                            Object.keys(this.state.menuItems.side).map((key, index) =>
                                                <MenuItem
                                                    key={index}
                                                    itemKey={key}
                                                    category={'side'}
                                                    privilege={this.state.accountPrivilege}
                                                    itemName={this.state.menuItems.side[key].itemName}
                                                    japaneseName={this.state.menuItems.side[key].japaneseName}
                                                    description={this.state.menuItems.side[key].description}
                                                    itemPrice={this.state.menuItems.side[key].itemPrice}
                                                    imageSource={this.state.menuItems.side[key].imageSource}
                                                    imageName={this.state.menuItems.side[key].imageName}
                                                />
                                            )
                                        }
                                    </div>
                                </div> : undefined
                            }
                            <br />
                            <br />
                            {
                                this.state.menuItems.dessertOrDrink ? <div>
                                    <h3 className="text-center selection-2 barlow font-weight-light">
                                        <img className="plus-icon" src="https://firebasestorage.googleapis.com/v0/b/info343-final-project-b0d70.appspot.com/o/plus.png?alt=media&token=532def02-8ba4-4b00-ab3e-b8740d10716c" alt="plus" />
                                        some <span className="font-weight-bold udon-red">DESSERTS & DRINKS</span>
                                    </h3>
                                    <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                                        {
                                            Object.keys(this.state.menuItems.dessertOrDrink).map((key, index) =>
                                                <MenuItem
                                                    key={index}
                                                    itemKey={key}
                                                    category={'dessertOrDrink'}
                                                    privilege={this.state.accountPrivilege}
                                                    itemName={this.state.menuItems.dessertOrDrink[key].itemName}
                                                    japaneseName={this.state.menuItems.dessertOrDrink[key].japaneseName}
                                                    description={this.state.menuItems.dessertOrDrink[key].description}
                                                    itemPrice={this.state.menuItems.dessertOrDrink[key].itemPrice}
                                                    imageSource={this.state.menuItems.dessertOrDrink[key].imageSource}
                                                    imageName={this.state.menuItems.dessertOrDrink[key].imageName}
                                                />
                                            )
                                        }
                                    </div>
                                </div> : undefined
                            }
                        </div>
                        : undefined
                }
                <div className="center mx-auto">
                    <img src="https://firebasestorage.googleapis.com/v0/b/info343-final-project-b0d70.appspot.com/o/equals.png?alt=media&token=936dd3ed-c2bd-479d-8769-5cdf8f07d737" alt="equals" />
                </div>
            </div >
        );
    }
}

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        };
    }

    // handleCancelEdit() {
    //     this.setState({ editedMessage: this.props.messageBody });
    // }

    // handleSaveEdit() {
    //     this.updateMessage();
    // }

    // updateMenuItem() {
    //     let updates = {};
    //     updates['menu/' + this.props.category + '/' + this.props.itemKey + '/itemName'] = this.state.editedName;
    //     updates['menu/' + this.props.category + '/' + this.props.itemKey + '/japaneseName'] = this.state.editedJapaneseName;        
    //     updates['messages/' + this.props.category + '/' + this.props.itemKey+ '/description'] = this.state.editedDescription;
    //     firebase.database().ref().update(updates);
    // }

    handleEditItem() {
        this.setState({ editing: true });
        this.menuItem.style = 'background-color: cornsilk';
    }

    deleteItem(key) {
        console.log(this.props.category);
        firebase.database().ref('menu/' + this.props.category + '/' + key).remove();
        let storageRef = firebase.storage().ref('menu/');
        storageRef.child(key + '/' + this.props.imageName).delete();
    }

    render() {
        return (
            <div className="menu-item my-2 col-lg-3 col-md-4" ref={menuItem => this.menuItem = menuItem}>
                {
                    this.props.privilege === 'admin' ? <div>
                        <img className="edit-icon" src={editIcon} alt="options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
                            <div className="dropdown-header">Options</div>
                            <div>
                                <div className="dropdown-item" onClick={() => this.handleEditItem()}>
                                    Edit item
                                </div>
                                <div className="dropdown-item" onClick={() => this.deleteItem(this.props.itemKey)}>
                                    Delete item
                                </div>
                            </div>
                        </div>
                    </div> : undefined
                }
                <img className="menu-pic" src={this.props.imageSource} alt={this.props.imageName} />
                {
                    this.state.editing ? <div className="menu-japanese">
                        <input className="menu-input form-control font-weight-bold" />
                        <input className="menu-input form-control" />
                        <textarea className="menu-input form-control menu-desc" />
                    </div> : <div className="menu-japanese">
                            <p className="my-1 font-weight-bold">{this.props.itemName}</p>
                            <p className="my-0">{this.props.japaneseName}</p>
                            <p className="menu-desc my-0">{this.props.description}</p>
                        </div>
                }
                {/* {
                    this.state.editing ? <div className="edit-buttons">
                        <button className="btn btn-small" type="button" onClick={() => this.handleCancelEdit()}>Cancel</button>
                        <button className="btn btn-small" type="button" onClick={() => this.handleSaveEdit()}>Save</button>
                    </div> : undefined
                } */}
            </div>
        );
    }
}

class AddMenuItem extends React.Component {
    constructor() {
        super();
        this.state = {
            category: '',
            itemName: '',
            japaneseName: '',
            description: '',
            itemPrice: 0,
            imageExists: false
        };
        this.handleInputItemName = this.handleInputItemName.bind(this);
        this.handleInputJapaneseName = this.handleInputJapaneseName.bind(this);
        this.handleInputDescription = this.handleInputDescription.bind(this);
        this.handleInputItemPrice = this.handleInputItemPrice.bind(this);
        this.handleAddMenuItem = this.handleAddMenuItem.bind(this);
    }

    handleInputItemName(event) {
        this.setState({ itemName: event.target.value });
    }

    handleInputJapaneseName(event) {
        this.setState({ japaneseName: event.target.value });
    }

    handleInputDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleInputItemPrice(event) {
        this.setState({ itemPrice: event.target.value });
    }

    handleInputCategory(event) {
        this.setState({ category: event.target.value })
    }

    handleShowImage(event) {
        let file = event.target.files[0];
        console.log(file);
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => this.foodImage.src = reader.result;
            this.setState({ imageExists: true });
        }
    }

    handleAddMenuItem(event) {
        event.preventDefault();
        let file = this.imageInput.files[0];
        if (file) {
            let key = firebase.database().ref().child('menu/' + this.state.category + '/').push().key;
            let storageRef = firebase.storage().ref('menu/' + key).child(file.name);
            storageRef.put(file).then(snapshot => this.handleUpdateMenuItem(event, key, file.name, snapshot.downloadURL));
        }
    }

    handleInputItemCategory() {
        if (this.radio1.checked) {
            this.setState({ category: this.radio1.value });
        } else if (this.radio2.checked) {
            this.setState({ category: this.radio2.value });
        } else {
            this.setState({ category: this.radio3.value });
        }
    }

    handleUpdateMenuItem(event, key, fileName, imageUrl) {
        event.preventDefault();
        let menuData = {
            imageSource: imageUrl,
            imageName: fileName,
            itemName: this.state.itemName,
            japaneseName: this.state.japaneseName,
            description: this.state.description,
            itemPrice: ''
        };
        let updates = {};
        updates['menu/' + this.state.category + '/' + key] = menuData;
        firebase.database().ref().update(updates);
        this.imageInput.value = '';
        this.foodImage.src = '';
        this.setState({ itemName: '', japaneseName: '', description: '', imageSource: '', itemPrice: 0, imageExists: false });
    }

    render() {
        return (
            <div className="center">
                <button className="btn btn-dark" data-toggle="modal" data-target="#addMenuItem">Add Menu Item</button>
                <div className="modal fade" id="addMenuItem" tabIndex="-1" role="dialog" aria-labelledby="addMenuItemLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <form className="modal-content" onSubmit={event => this.handleAddMenuItem(event)}>
                            <div id="modalHeader" className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div id="modalBody" className="modal-body">
                                <h2>Add New Menu Item</h2>
                                <img className="food-item" alt="Food Item" ref={foodImage => this.foodImage = foodImage} />
                                {this.state.imageExists ? undefined : <div className="alert alert-danger">An image is required</div>}
                                <button className="btn btn-dark d-block mt-3 mb-3 mx-auto" onClick={() => this.imageInput.click()}>Add Image</button>
                                <label className="custom-control custom-radio">
                                    <input id="radio1" name="radio" type="radio" className="custom-control-input" value="udon" required
                                        ref={radio1 => this.radio1 = radio1}
                                        onChange={event => this.handleInputItemCategory(event)}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Udon</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio2" name="radio" type="radio" className="custom-control-input" value="side"
                                        ref={radio2 => this.radio2 = radio2}
                                        onChange={event => this.handleInputItemCategory(event)}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Topping/Side</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio3" name="radio" type="radio" className="custom-control-input" value="dessertOrDrink"
                                        ref={radio3 => this.radio3 = radio3}
                                        onChange={event => this.handleInputItemCategory(event)}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Dessert/Drink</span>
                                </label>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Item Name" required
                                        value={this.state.itemName}
                                        onInput={event => this.handleInputItemName(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Japanese Name" required
                                        value={this.state.japaneseName}
                                        onInput={event => this.handleInputJapaneseName(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Description" rows="4"
                                        value={this.state.description}
                                        onInput={event => this.handleInputDescription(event)}>
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control" placeholder="Item price" required
                                        value={this.state.itemPrice}
                                        onInput={event => this.handleInputItemPrice(event)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            <input className="hide" type="file" accept="image/*" required
                                ref={imageInput => this.imageInput = imageInput}
                                onChange={(event) => this.handleShowImage(event)}
                            />
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}