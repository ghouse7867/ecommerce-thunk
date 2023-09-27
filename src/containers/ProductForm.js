import React, { useState } from 'react';
import { Button, Form, TextArea, Dropdown, Input, Label, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';

const ProductForm = () => {

    const dispatch = useDispatch();


    const [productData, setProductData] = useState({
        name: '',
        price: 0,
        description: '',
        image: null,
        category: '',
        seller: '',
        stock: 0,
    });
   console.log(productData.image)

    const handleInputChange = (e, { name, value }) => {
        e.preventDefault();
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
    
        if (!imageFile) {
            return;
        }
    
    
        setProductData({
            ...productData,
            image: imageFile,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Handling form submission...');
        if (!productData.name || !productData.seller || !productData.category || !productData.description) {
            alert('Please fill in all required fields.');
            return;
        }
         // Parse price and stock as numbers
    const parsedPrice = parseFloat(productData.price);
    const parsedStock = parseInt(productData.stock);

    // Check if parsing was successful
    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
        alert('Invalid price or stock value.');
        return;
    }
    setProductData({
        ...productData,
        price: parsedPrice,
        stock: parsedStock,
    });


       dispatch(addProduct(productData));
        console.log(productData);
    };


    const categoryOptions = [
        { key: 'electronics', text: 'Electronics', value: 'Electronics' },
        { key: 'cameras', text: 'Cameras', value: 'Cameras' },
        { key: 'laptops', text: 'Laptops', value: 'Laptops' },
        { key: 'accessories', text: 'Accessories', value: 'Accessories' },
        { key: 'outdoor', text: 'Outdoor', value: 'Outdoor' },
        { key: 'sports', text: 'Sports', value: 'Sports' },
        { key: 'beauty/Health', text: 'Beauty/Health', value: 'Beauty/Health' },
        { key: 'Books', text: 'Books', value: 'Books' },
        { key: 'food', text: 'Food', value: 'Food' },
        { key: 'clothes/Shoes', text: 'Clothes/Shoes', value: 'Clothes/Shoes' },

    ];

    return (
        <div style={{ width: '50%', margin: '0 auto', padding: '20px' }}>
        <div>
            <h1>Add New Product</h1>
            <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                <Form.Input
                    label="Product Name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    required
                />
                 
                <Form.Input
                    label="Price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleInputChange}
                    icon='dollar'
                    iconPosition='left'
                    required
                />

                <Form.Field
                    control={TextArea}
                    label="Description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    required
                />

                <Input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"    
                    onChange={handleImageChange}
                    label={
                        <Label basic>
                            <Icon name='cloud upload' />
                            Upload Image
                        </Label>
                    }
                />

                <Form.Field
                    control={Dropdown}
                    label="Category"
                    name="category"
                    options={categoryOptions}
                    value={productData.category}
                    onChange={handleInputChange}
                    selection
                    required
                />

                <Form.Input
                    label="Seller"
                    name="seller"
                    value={productData.seller}
                    onChange={handleInputChange}
                    required
                />

                <Form.Input
                    label="Stock"
                    name="stock"
                    type="number"
                    value={productData.stock}
                    onChange={handleInputChange}
                    required
                />

                <Button
                    color="blue"
                    type="submit"
                >
                    Save Product
                </Button>
            </Form>
        </div>
        </div>
    );
};

export default ProductForm;
