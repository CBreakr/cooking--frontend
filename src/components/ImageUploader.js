import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import DropzoneComponent from 'react-dropzone-component';
// // import 'react-dropzone-component/styles/filepicker';
// import 'dropzone/dist/min/dropzone.min';

import Dropzone from "react-dropzone";

/*

OK, our example is a little bit more complicated:
- we have to either accept a file or else a URL
    - so we need to handle the different cases accordingly
    - 

    - I think we only need the imageSrc & imageURL for this control
    ---> No, we should keep a copy of the previous value
        - and allow the user to "reset" to that if they so choose
            - how do we remove the file?
                - just remove it from the state?
                    - will this take care of the file in the control?
*/

/*
const djsConfig = {
    acceptedFiles: "image/jpeg,image/png,image/gif",
    autoProcessQueue: false,
    uploadMultiple: false,
    addRemoveLinks: true
}

const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    maxFiles: 1,
    postUrl: 'no-url'
}
*/

export default class ImageUploader extends PureComponent {

    state = {
        imageURL: null,
        imageSrc: null,
        changed: false,
        imageURLInput: ""
    }

    /*
    showPreview = image => {
        if(image == null) return;

        let mockFile = {
            name: image.name,
            size: image.byte_size,
            dataURL: image.url,
        };

        this.myDropzone.files.push(mockFile);
        this.myDropzone.emit("addedfile", mockFile);
        this.myDropzone.createThumbnailFromUrl(
        mockFile,
        this.myDropzone.options.thumbnailWidth,
        this.myDropzone.options.thumbnailHeight,
        this.myDropzone.options.thumbnailMethod,
        true,
        thumbnail => {
            this.myDropzone.emit('thumbnail', mockFile, thumbnail);
            this.myDropzone.emit("complete", mockFile);
        }
        );
    }

    removePrevAndAddNew = image => {
        if(this.myDropzone.files.length > 1) {
            let prevImage = this.myDropzone.files[0];
            this.myDropzone.emit('removedfile', prevImage);
        }

        this.props.selectImage(image);
    }
    */

    //
    //
    //
    // OUTSIDE INTERACTION: SET IMAGE
    // --> this.props.selectImage
    //
    //
    //
    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        var reader = new FileReader();

        this.props.selectImage(acceptedFiles[0]);
    
        reader.onload = (event) =>  {
            // $('#blah').attr('src', e.target.result);
            this.setState({
                imageURL: null,
                imageSrc: event.target.result,
                changed: true
            });
        }
        
        reader.readAsDataURL(acceptedFiles[0]);
    }

    //
    //
    //
    // OUTSIDE INTERACTION: REMOVE EXISTING IMAGE
    // --> this.props.unselectImage()
    //
    //
    //
    removeExistingImage = () => {
        console.log("remove existing image");

        this.props.unselectImage();
        this.setState({
            changed: true
        });
    }

    removeImage = () => {
        this.setState({
            imageURL: null,
            imageSrc: null
        });
    }

    changeURLInput = (event) => {
        this.setState({imageURLInput: event.target.value});
    }

    updateImageURL = () => {
        this.props.setImageUrl(this.state.imageURLInput);
        this.setState({
            imageURL: this.state.imageURLInput,
            imageSrc: null,
            changed: true
        });
    }

    resetImage = () => {
        this.props.resetImage();
        this.setState({
            imageURL: null,
            imageSrc: null,
            changed: false
        })
    }

    render() {

        // const { image } = this.props;

        /*
        const eventHandlers = {
            init: dropzone => {
                this.myDropzone = dropzone;
                this.showPreview(image);
            },
            addedfile: image => this.removePrevAndAddNew(image),
            removedfile: () => this.props.unselectImage()
        }
        */

        // return (
        // <DropzoneComponent
        //     config={componentConfig}
        //     eventHandlers={eventHandlers}
        //     djsConfig={djsConfig}
        // />
        // );

        console.log("Image Uploader", this.state, "AAA", this.props.loadedImageUrl);

        return (
        <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps}) => (
                <>
                <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Click me or drag image file HERE to upload!</p>
                    {
                        this.state.imageSrc
                        ? (
                            <>
                            <img src={this.state.imageSrc} alt="image" />
                            </>
                        )
                        : ""
                    }
                    {
                        this.state.imageURL
                        ? (
                            <>
                            <img src={this.state.imageURL} alt="image" />
                            </>
                        )
                        : ""
                    }
                    {
                        !this.state.imageSrc 
                        && !this.state.imageURL 
                        && this.props.loadedImageUrl
                        && this.props.loadedImageUrl !== ""
                        && !this.state.changed
                        ? (
                            <div>
                                Pre-existing Image
                                <img src={this.props.loadedImageUrl} alt="image" />                                
                            </div>
                        )
                        : ""
                    }
                </div>
                {
                    this.state.imageSrc || this.state.imageURL
                    ? <button onClick={this.removeImage}>Remove</button>
                    : ""
                }
                {
                        !this.state.imageSrc 
                        && !this.state.imageURL 
                        && this.props.loadedImageUrl
                        && this.props.loadedImageUrl !== ""
                        && !this.state.changed
                        ? <button onClick={this.removeExistingImage}>Remove</button>
                        : ""
                }
                <br />
                <p>
                    Or use image URL
                </p>
                <input type="text" placeholder="image URL"
                    value={this.state.imageURLInput}
                    onChange={this.changeURLInput}
                />
                <button onClick={this.updateImageURL}>Set Image URL</button>

                {
                    this.state.changed
                    ? <button onClick={this.resetImage}>Reset Image</button>
                    : ""
                }
                </>
            )}
        </Dropzone>
        )
    }
}

// ImageUploader.propTypes = {
//   image: PropTypes.shape({
//     name: PropTypes.string,
//     byte_size: PropTypes.integer,
//     url: PropTypes.string
//   }),
//   selectImage: PropTypes.func.isRequired,
//   unselectImage: PropTypes.func.isRequired
// };