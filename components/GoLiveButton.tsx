'use client';
export default function GoLiveButton({ email, character }: { email: string; character: string }){
  return (<button style={{padding:'8px 12px',borderRadius:12,background:'#fff',color:'#000'}}>Go Live ({character})</button>);
}
