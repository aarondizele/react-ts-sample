import React, { createRef } from "react";

class RichTextEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fontSizeOption: [],
            fontSize: '7'
        }

        this.execChangeFontName = this.execChangeFontName.bind(this);
        this.execChangeFontSize = this.execChangeFontSize.bind(this);
    }

    document = createRef(null);

    componentDidMount() {
        this.editor = this.document.current.contentDocument;
        this.editor.designMode = 'On';
        this.editor.contentEditable = true;

        let fontSizeOption = [];
        // 
        for (let i = 1; i <= 7; i++) {
            fontSizeOption.push(i);
        }

        this.setState({
            fontSizeOption
        })
    }

    execCmd = (command) => { this.editor.execCommand(command, false, null); };
    execCmdWithArg = (command, arg) => { this.editor.execCommand(command, false, arg); };
    execChangeFontName = (event) => { this.editor.execCommand('fontName', false, event.target.value); };
    execChangeFontSize = (event) => { this.editor.execCommand('fontSize', false, event.target.value); };
    toggleSource = () => { }
    toggleEdit = () => { }

    render() {
        return (<React.Fragment>
            <div>
                <a className="p-2" onClick={() => this.execCmd('bold')}><i className="bi bi-type-bold"></i></a>
                <a className="p-2" onClick={() => this.execCmd('italic')}><i className="bi bi-type-italic"></i></a>
                <a className="p-2" onClick={() => this.execCmd('underline')} > <i className="bi bi-type-underline"></i></a >
                <a className="p-2" onClick={() => this.execCmd('strikeThrough')} > <i className="bi bi-type-strikethrough"></i></a >
                <a className="p-2" onClick={() => this.execCmd('justifyLeft')}> <i className="bi bi-text-left"></i></a >
                <a className="p-2" onClick={() => this.execCmd('justifyCenter')}> <i className="bi bi-text-center"></i></a >
                <a className="p-2" onClick={() => this.execCmd('justifyRight')}> <i className="bi bi-text-right"></i></a >
                <a className="p-2" onClick={() => this.execCmd('justifyFull')}> <i className="bi bi-justify-right"></i></a >
                <a className="p-2" onClick={() => this.execCmd('cut')}> <i className="bi bi-cut"></i></a >
                <a className="p-2" onClick={() => this.execCmd('copy')}> <i className="bi bi-copy"></i></a >
                <a className="p-2" onClick={() => this.execCmd('indent')}> <i className="bi bi-indent"></i></a >
                <a className="p-2" onClick={() => this.execCmd('outdent')}> <i className="bi bi-dedent"></i></a >
                <a className="p-2" onClick={() => this.execCmd('subscript')}> <i className="bi bi-subscript"></i></a >
                <a className="p-2" onClick={() => this.execCmd('superscript')}> <i className="bi bi-superscript"></i></a >
                <a className="p-2" onClick={() => this.execCmd('undo')}> <i className="bi bi-undo"></i></a >
                <a className="p-2" onClick={() => this.execCmd('repeat')}> <i className="bi bi-repeat"></i></a >
                <a className="p-2" onClick={() => this.execCmd('insertUnorderedList')}> <i className="bi bi-list-ul"></i></a >
                <a className="p-2" onClick={() => this.execCmd('insertOrderedList')}> <i className="bi bi-list-ol"></i></a >
                <a className="p-2" onClick={() => this.execCmd('insertParagraph')}> <i className="bi bi-paragraph"></i></a >

                <select onChange={({ target }) => this.execCmdWithArg('formatBlock', target.value)} >
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="H3">H3</option>
                    <option value="H4">H4</option>
                    <option value="H5">H5</option>
                    <option value="H6">H6</option>
                </select >

                <a className="p-2" onClick={() => this.execCmd('insertHorizontalRule')}> <i className="bi bi-hr"></i></a >
                <a className="p-2" onClick={() => this.execCmdWithArg('createLink', window.prompt('Enter a URL', 'http://'))}> <i className="bi bi-link-45deg"></i></a >
                <a className="p-2" onClick={() => this.execCmd('unlink')}> Unlink</a >
                <a className="p-2" onClick={() => this.toggleSource()}> <i className="bi bi-code-square"></i></a >
                <a className="p-2" onClick={() => this.toggleEdit()}> <i className="bi bi-pen"></i></a >

                <select onChange={this.execChangeFontName} >
                    <option>Police</option>
                    <option value="Arial">Arial</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Courier">Courier</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                </select >

                <select onChange={this.execChangeFontSize} >
                    <option>Font Size</option>
                    <option value="10">10 px</option>
                    <option value="11">11 px</option>
                    <option value="12">12 px</option>
                    <option value="14">14 px</option>
                    <option value="16">16 px</option>
                    <option value="18">18 px</option>
                    <option value="20">20 px</option>
                    <option value="22">22 px</option>
                    <option value="24">24 px</option>
                </select >
                <div>Color &nbsp;<input type="color" onChange={({ target }) => this.execCmdWithArg('foreColor', target.value)} /></div>

                <div>Background Color &nbsp;<input type="color" onChange={({ target }) => this.execCmdWithArg('hiliteColor', target.value)} /></div>

                <a className="p-2" onClick={() => this.execCmdWithArg('inserImage', window.prompt('Enter a image URL', ''))}> <i className="bi bi-image"></i></a >

                <a className="p-2" onClick={() => this.execCmd('selectAll')}> <i className="bi bi-arrows-fullscreen"></i></a >
            </div >

            <iframe ref={this.document} className="richTextEditor"></iframe>
        </React.Fragment>)
    }
}

export default RichTextEditor;