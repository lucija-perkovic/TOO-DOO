/**
 * Actions
 */
 export const START_ACTION = 'START_ACTION';
 export const STOP_ACTION = 'STOP_ACTION';
 
 export const SHOW_ERROR_TOAST = 'SHOW_ERROR_TOAST';
 export const HIDE_ERROR_TOAST = 'HIDE_ERROR_TOAST';
  
 /*
  * Action creators
  */
 
 export const startAction = (name: string, params?: any) => ({
   type: START_ACTION,
   payload: {
     action: {
       name,
       params,
     },
   },
 });
 
 export const stopAction = (name: string) => ({
   type: STOP_ACTION,
   payload: { name },
 });
 
 export function showErrorToast(message: string) {
   return { type: SHOW_ERROR_TOAST, message };
 }
 
 export function hideErrorToast() {
   return { type: HIDE_ERROR_TOAST };
 }