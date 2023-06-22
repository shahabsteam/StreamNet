
import { Field,reduxForm } from 'redux-form';
import React from 'react'
//how can we connect both connect and redux form ?
 class StreamForm extends React.Component{
     renderError({error,touched}){
            if(touched && error){
                return (
                    <div className='ui error message small '>
                        <div className='header'>{error}</div>
                    </div>
                )
            }
     }
     renderInput=({input,label,meta})=>{
         const classname = `field ${meta.error && meta.touched ? 'error':''}`
            return (
                <div className={classname}>
                    <label>{label}</label>
                    <input {...input} autoComplete='off' />
                   
                    {this.renderError(meta)}
                </div>
            )
     }
     onSubmit=(formValues)=>{
         this.props.onSubmit(formValues)
     }
    render(){
        return(<form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error '>
            <Field name='title' component={this.renderInput} label='enter Title'/>
            <Field name='description'component={this.renderInput} label = 'enter description'/>
            <button className='ui button primary'>submit</button>
        </form>)
    }
}
const validate = (formValues)=>{
    const errors={}
    if(!formValues.title){
        errors.title = ' you must enter a title'
    }
    if(!formValues.description){
        errors.description = 'you must enter a description'
    }
    return errors
}
export default reduxForm({
    form : 'streamForm',
    validate : validate
})(StreamForm);