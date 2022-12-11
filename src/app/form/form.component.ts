import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  inputType = InputType;
  formName: FormGroup = {} as FormGroup;
  @Input() configration: FormControlOptions[] = [];
  @Input() patchValues?: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder,private _httpClient: HttpClient) { }
  ngOnChanges(simpleChanges: any) {
    if (simpleChanges.patchValues?.currentValue) {
      this.patchFormValue(simpleChanges.patchValues?.currentValue)
    }
  }
  ngOnInit(): void {
    this.configration = this.configration.map(control => {
      let className = control.classes ? control.classes?.toString().split(',').join(' ') : control.class ? control.class : 'col-12';
      return {
        ...control,
        class: className
      }
    });
    this.formName = this.fb.group({
      ...this.createForm(),
    })
    this.getData();
  }
  handleSelectChange(event: any) {
    let id = event.target.id;
    let value = event.target.value;
    let crtl = this.configration.find(config => config.dependsOn == id && config.inputType == InputType.InputSelect)!;
    this.formName.controls[crtl.controlName].setValue(null);
    if (crtl) {
      this._httpClient.get(crtl.dataUrl + `${value}`).subscribe((response: any) => {
        crtl.optionValues = response.map((trans: any) => {
          return {
            text: trans[crtl.mapByKeys?.text],
            value: trans[crtl.mapByKeys?.value],
          }
        });
      })
    }
  }
  getData() {
    let controls = this.configration.filter(config => config.dataUrl && !config.dependsOn);
    controls.forEach(crtl => {
      this._httpClient.get(crtl.dataUrl!).subscribe((response: any) => {
        console.log(response)
        crtl.optionValues = response.map((trans: any) => {
          return {
            text: trans[crtl.mapByKeys?.text],
            value: trans[crtl.mapByKeys?.value],
          }
        })
      })
    })
  }
  get f() {
    return this.formName.controls;
  }
  createForm() {
    let controls: any;
    let controlValue: any;
    this.configration.forEach(control => {
      if (!control.value && control.inputType == this.inputType.InputText)
        controlValue = '';
      else if (!control.value && control.inputType == this.inputType.InputSelect)
        controlValue = null;
      else if (!control.value && control.inputType == this.inputType.InputRadio)
        controlValue = '';
      else if (!control.value && control.inputType == this.inputType.InputCheckBox)
        controlValue = true;
      else if (!control.value && control.inputType == this.inputType.InputHidden)
        controlValue = '0';
      else if (!control.value && control.inputType == this.inputType.InputFile)
        controlValue = '';
      controlValue = control.value ? control.value : controlValue;
      let obj = {
        [control.controlName]: [controlValue, control.controlValidatros]
      }
      controls = {
        ...controls,
        ...obj
      }
    })
    return controls;
  }
  handleSubmit() {
    this.isSubmitted = true;
    if (this.formName.valid) {
      this.onClick.emit({ data: this.formName.value, type: 'submit' });
      this.formName.reset();
      this.isSubmitted = false;
    }
  }
  patchFormValue(values: any) {
    this.formName.patchValue(values)
  }
  handleFileChange(event: any) {
    let sibling = event.target.nextSibling;
    this.fileToBase64(event.target.files[0]).then((x:any) => {
      sibling.setAttribute('src',x.base64);
      sibling.setAttribute('width',80);
      sibling.setAttribute('height',80);
    });
  }
  fileToBase64 = async (file: any) =>
    new Promise((resolve, reject) => {
      let width: any, height: any;
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        let img = new Image();
        img.src = reader.result?.toString()!;
        img.onload = () => {
          width = img.width;
          height = img.height;
          resolve({ height, width, base64: reader.result })
        }
      }
      reader.onerror = (e) => reject(e)
    })
}
export interface FormControlOptions {
  id?: string
  inputType: string;
  controlName: string;
  labelName: string;
  value?: any;
  controlValidatros?: Validator[];
  optionValues?: OptionValues[];
  classes?: string[];
  class?: string;
  dataUrl?: any;
  dependsOn?: string;
  mapByKeys?: OptionValues;
}
export interface Validator {
  name: Validators;
}
export interface OptionValues {
  text: any;
  value: any;
}
export enum InputType {
  InputText = "InputText",
  InputRadio = "InputRadio",
  InputCheckBox = "InputCheckBox",
  InputSelect = "InputSelect",
  InputHidden = "InputHidden",
  InputFile = "InputFile",
  InputDate = "InputDate",
}


