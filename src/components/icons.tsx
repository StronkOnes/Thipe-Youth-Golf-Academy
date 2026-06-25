

import React from 'react';

interface IconProps {
  className?: string;
}

export const GolfFlagIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h12M3.75 3.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75v12.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 3-2.25 2.25 2.25 2.25" />
  </svg>
);


export const CommunityIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.284-2.72-4.682-2.72a3 3 0 0 0-4.682 2.72 9.094 9.094 0 0 0 3.741.479m-4.5-5.232v-6.632a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6.632M12 10.5h.008v.008H12v-.008Z" />
  </svg>
);

export const SustainabilityIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662a48.678 48.678 0 0 0 0 7.324 4.006 4.006 0 0 0 3.7 3.7c1.21.092 2.43.138 3.662.138s2.453-.046 3.662-.138a4.006 4.006 0 0 0 3.7-3.7c.092-1.21.138-2.43.138-3.662Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V3m0 9h9" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
export const PaperClipIcon: React.FC<IconProps> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.364 6.364l-3.182 3.182a.75.75 0 0 1-1.06-1.061l3.182-3.182a3 3 0 0 0-4.242-4.242l-7 7a1.5 1.5 0 0 0 2.121 2.121l7-7a.75.75 0 0 1 1.06 1.06l-7 7a3 3 0 0 1-4.243-4.242l7-7a1.5 1.5 0 0 1 2.121 0Z" clipRule="evenodd" /></svg>;
export const ArrowDownTrayIcon: React.FC<IconProps> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
export const SparklesIcon: React.FC<IconProps> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 8.5a.5.5 0 011 0V10a.5.5 0 01-1 0V8.5zm3-1a.5.5 0 000 1H10a.5.5 0 000-1H8.5zm2 .5a.5.5 0 011 0V10a.5.5 0 01-1 0V8zm4-2.5a.5.5 0 00-1 0V10a.5.5 0 001 0V5.5zM12 14a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
export const SendIcon: React.FC<IconProps> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.172 15V4.828a1 1 0 00-1.169-1.409l-5 1.428zM12.894 2.553a1 1 0 011.788 0l7 14a1 1 0 01-1.169 1.409l-5-1.428A1 1 0 0114.828 15V4.828a1 1 0 011.169-1.409l5 1.428z" /></svg>;
export const TelegramIcon: React.FC<IconProps> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" clipRule="evenodd" d="M21.722 4.244a2.334 2.334 0 0 0-1.947-1.947C18.022 1.62 12 1.5 12 1.5s-6.022.12-7.775.797a2.334 2.334 0 0 0-1.947 1.947C1.62 6.022 1.5 12 1.5 12s.12 5.978.797 7.775a2.334 2.334 0 0 0 1.947 1.947C6.022 22.38 12 22.5 12 22.5s6.022-.12 7.775-.797a2.334 2.334 0 0 0 1.947-1.947C22.38 17.978 22.5 12 22.5 12s-.12-5.978-.778-7.756zM9.014 17.618l2.223-3.95L15.42 16.32l2.39-10.435-11.45 4.41 3.514 1.107 5.74-3.56-3.81 4.582-6.203-1.802 1.41 4.996z" /></svg>;
export const WhatsAppIcon: React.FC<IconProps> = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path fillRule="evenodd" d="M18.41,5.55A10.36,10.36,0,0,0,3.58,18.42L3,21l2.58-.57A10.36,10.36,0,0,0,18.41,5.55M12,20.94a8.54,8.54,0,0,1-4.57-1.34l-.33-.2-3.37.89.9-3.29-.22-.34A8.54,8.54,0,1,1,12,20.94m4.8-6.12c-.27-.13-1.58-.78-1.82-.87s-.42-.13-.6,0l-.78.87a.72.72,0,0,1-1-.58,7,7,0,0,1-2-1.85,7.74,7.74,0,0,1-1.4-2A.66.66,0,0,1,10.19,8l.66-.78a.56.56,0,0,0,0-.52,11.13,11.13,0,0,0-.87-1.82.59.59,0,0,0-.54-.25h-.54a1,1,0,0,0-.86,1,3.87,3.87,0,0,0,1.18,2.75,8.83,8.83,0,0,0,3.78,4.72,4.42,4.42,0,0,0,3-1.27,3.13,3.13,0,0,0,.84-1.9.43.43,0,0,0-.19-.36Z" clipRule="evenodd" /></svg>;
export const CloudArrowUpIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>;
export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" /></svg>;
