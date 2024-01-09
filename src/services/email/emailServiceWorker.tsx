// services/EmailServiceWorker.tsx
import React, { useState } from 'react';

interface EmailServiceWorkerProps {
  email: string;
  nickname: string;
  quizName: string;
  grade: string;
}

class EmailServiceWorker extends React.Component<EmailServiceWorkerProps> {
  constructor(props: EmailServiceWorkerProps) {
    super(props);
  }

  private sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.props.email,
          nickname: this.props.nickname,
          quizName: this.props.quizName,
          grade: this.props.grade,
        }),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(`Error in sendEmail: ${error}`);
    }
  };

  public sendEmailAsync = async () => {
    await this.sendEmail();
  };


}

export default EmailServiceWorker;
