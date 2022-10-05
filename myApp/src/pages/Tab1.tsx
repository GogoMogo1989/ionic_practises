import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,  
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonText,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonToggle,
  IonRange,
  IonCard
} from '@ionic/react';
import './Tab1.css';
import {useForm, Controller} from "react-hook-form"
import React, { useState } from 'react';
import {NavContext} from '@ionic/react';
import {useContext} from 'react';

const Tab1: React.FC = () => {

  const {
        handleSubmit, 
        control,
        setValue,
        register,
        getValues,
        formState: {errors}
      } = useForm({
        defaultValues: {
          rangeInfo: -50,
          gender: 'FEMALE',
          email:"",
          privatToggle: false,
          privatCheck: true,
          radioGrp: 'color',
          startDate: "2011.01.01"
        }
      })

    
  const onSubmit = (data:any) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
      <><IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Form - React</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
          <form onSubmit={handleSubmit(onSubmit)}>
              <IonItem>
                <IonLabel>Pick Date</IonLabel>
                <IonDatetime 
                   presentation="month-year"
                />
              </IonItem>

              <IonItem>
                <IonLabel>GENDER</IonLabel>
                <Controller
                  render={({ field }) => (
                  <IonSelect
                      placeholder="Select One"
                      value={field.value}
                      onIonChange={e => setValue('gender', e.detail.value)}
                  >
                    <IonSelectOption value="FEMALE">Female</IonSelectOption>
                    <IonSelectOption value="MALE">Male</IonSelectOption>
                  </IonSelect>
                )}
                control={control}
                name="gender"
                rules={{ required: "This is a required field"}}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput 
                  {...register('email', {
                    required: "This is a required email",
                    pattern: {
                      value: /^[A-Z0-9.*%+-]+@[[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email address"
                    }
                  })}
                />
              </IonItem>

              <IonItem>
                <IonText>
                  <div style={{ padding:8, paddingLeft:0, fontWeight: 'bold'}}>
                    Radio Group
                  </div>
                  <div>
                    <IonRadioGroup
                      style={{ display:"flex", width: "100%"}}
                      {...register("radioGrp", {required: true})}
                      defaultValue={getValues("radioGrp")}
                      onIonChange={e => setValue("radioGrp", e.detail.value)}
                      >
                        <IonItem
                          lines="none"
                          style={{
                            flexGrow:2
                          }}
                        >
                          <IonLabel position="fixed">Color</IonLabel>
                          <IonRadio slot="end" value="color"/>
                        </IonItem>
                        <IonItem style={{ flexGrow: 2}} lines="none">
                          <IonLabel position="fixed">Red</IonLabel>
                          <IonRadio slot="end" value="red"/>
                        </IonItem>
                        <IonItem style={{ flexGrow: 2}} lines="none">
                          <IonLabel position="fixed">Blue</IonLabel>
                          <IonRadio slot="end" value="blue"/>
                        </IonItem>
                    </IonRadioGroup>
                  </div>
                </IonText>
              </IonItem>
              {errors.radioGrp && (
                <span className="error-message">This field is requiered</span>
              )}

              <IonItem>
                <IonLabel>Privat Check</IonLabel>
                <Controller
                  name="privatCheck"
                  control={control}
                  render={({ field }) => {
                    return (
                      <IonCheckbox
                      checked={field.value}
                      onIonChange={e=>{
                        setValue('privatCheck', e.detail.checked)
                      }}
                      />
                    )
                  }}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Privat Toggle</IonLabel>
                <Controller 
                  name="privatToggle"
                  control={control}
                  render={({field}) =>{
                    return(
                      <IonToggle 
                        checked={field.value}
                        onIonChange={e=>{
                          setValue("privatToggle", e.detail.checked)
                        }}
                      />
                    )
                  }}
                />
              </IonItem>

              <IonItem>
                  <Controller
                    render={({field}) => {
                      return(
                      <IonRange
                        min={-200}
                        max={200}
                        value={field.value}
                        color="secondary"
                        onIonChange={e => {
                          setValue('rangeInfo', e.detail.value as number)
                        }}
                      >
                      
                        <IonLabel slot="start">-200</IonLabel>
                        <IonLabel slot="end">200</IonLabel>
                      </IonRange>
                    )}}
                    control={control}
                    name="rangeInfo"
                    rules={{required: "Please Select A Value"}}
                  />
              </IonItem>
            <IonButton className="ion-margin-top" expand="block" type="submit">Submit</IonButton>
          </form>
            
          </IonCard>
        </IonContent>
    </IonPage>
    </>
  );
};

export default Tab1;
