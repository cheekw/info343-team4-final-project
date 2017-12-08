import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";

export default class MenuPage extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: {}
        };
    }

    componentWillMount() {
        this.menu = firebase.database().ref('menu/')
        this.menu.on('value', snapshot => this.setState({ menuItems: snapshot.val() }));
    }

    render() {
        return (
            <div className="menu-view bg-light py-2">
                <h1 className="my-2 text-center selection-1 barlow">T h e  &nbsp; <span className="udon-red">S e l e c t i o n</span></h1>
                <h3 className="text-center selection-2 barlow">Noodles for every occasion</h3>
                <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                    {
                        this.state.menuItems ? Object.keys(this.state.menuItems).map((key, index) => 
                        <MenuItem
                            key={index}
                            itemName={this.state.menuItems[key].itemName}
                            japaneseName={this.state.menuItems[key].japaneseName}
                            description={this.state.menuItems[key].description}
                            itemPrice={this.state.menuItems[key].itemPrice}
                            imageSource={this.state.menuItems[key].imageSource}
                            imageName={this.state.menuItems[key].imageName}
                        />) : undefined
                    }
                </div>
                <br />
                <br />

                <h2 className="text-center selection-2 barlow">Add a <span className="font-weight-bold">CRUNCH</span> or something <span className="font-weight-bold">SWEET</span></h2>
                <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                    <MenuItem soupName="Tempura" japaneseName="天ぷら"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-tempura.png?w=170&zoom=2" alt="tempura" />
                    <MenuItem soupName="Kaki-Age" japaneseName="かき揚げ"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-kakiage.png?w=170&zoom=2" alt="kakiage" />
                    <MenuItem soupName="Kaarage" japaneseName="唐揚げ"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-karaage.png?w=170&zoom=2" alt="kaarage" />
                    <MenuItem soupName="Onigiri" japaneseName="おむすび"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-onigiri2.png?w=170&zoom=2" alt="onigiri" />
                    <MenuItem soupName="Fountain Drink" japaneseName="お飲物"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-fountain-drink.png?w=170&zoom=2" alt="drink" />
                    <MenuItem soupName="Specialty Drink" japaneseName="お飲物"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-specialty-drink.png?w=170&zoom=2" alt="specialty drink" />
                    <MenuItem soupName="Cake Slice" japaneseName="デザート"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-cake.png?w=170&zoom=2" alt="cake" />
                    <MenuItem soupName="Flan/Purin" japaneseName="デザート"
                        src="https://udonseattle.files.wordpress.com/2011/12/menu-flan.png?w=170&zoom=2" alt="flan/purin" />
                </div>
                {this.props.user ? <AddMenuItem /> : undefined}
            </div>
        );
    }
}

class MenuItem extends React.Component {
    render() {
        return (
            <div className="menu-item px-2 my-2 mx-2 col-lg-3">
                <img className="menu-pic" src={this.props.imageSource} alt={this.props.imageName} />
                <div className="menu-japanese">
                    <p className="my-1 font-weight-bold">{this.props.itemName}</p>
                    <p className="my-0">{this.props.japaneseName}</p>
                    <p className="menu-desc my-0">{this.props.description}</p>
                </div>
            </div>
        );
    }
}

class AddMenuItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isUdon: true,
            category: '',
            itemName: '',
            japaneseName: '',
            description: '',
            itemPrice: 0
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
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => this.foodImage.src = reader.result;
        }
    }

    handleAddMenuItem(event) {
        event.preventDefault();
        let file = this.imageInput.files[0];
        if (file) {
            let key = firebase.database().ref().child('menu/').push().key;
            let storageRef = firebase.storage().ref('menu/' + key).child(file.name);
            storageRef.put(file).then(snapshot => this.handleUpdateMenuItem(event, key, file.name, snapshot.downloadURL));
        }
    }

    handleUpdateMenuItem(event, key, fileName, imageUrl) {
        event.preventDefault();
        let menuData = {
            itemName: this.state.itemName,
            japaneseName: this.state.japaneseName,
            description: this.state.description,
            itemPrice: '',
            imageSource: imageUrl,
            imageName: fileName
        };
        let updates = {};
        updates['menu/' + key] = menuData;
        firebase.database().ref().update(updates);
        this.imageInput.value = '';
        this.foodImage.src = '';
        this.setState({ itemName: '', japaneseName: '', description: '', imageSource: '', itemPrice: 0});
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
                                <button className="btn btn-dark d-block mt-3 mb-3 mx-auto" onClick={() => this.imageInput.click()}>Add Image</button>
                                <label className="custom-control custom-radio">
                                    <input id="radio1" name="radio" type="radio" className="custom-control-input" value="udon" required
                                        ref={udonRadio => this.udonRadio = udonRadio}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Udon</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio2" name="radio" type="radio" className="custom-control-input" value="side"/>
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Side</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio3" name="radio" type="radio" className="custom-control-input" value="dessertOrDrink"/>
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