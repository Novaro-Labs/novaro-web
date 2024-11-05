import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #f0f2f5, #e6f7ff)'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Oops! The page you are looking for might have been removed, had its name changed or is temporarily unavailable."
        extra={
          <Link to="/">
            <Button type="primary" icon={<HomeOutlined />}>
              Back to Home
            </Button>
          </Link>
        }
      />
    </div>
  );
}