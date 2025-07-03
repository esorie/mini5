// frontend/src/pages/MyPage.jsx
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider, // 구분선 추가
  Chip // 구독 여부 표시용 칩 추가
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // 구독 중 아이콘
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';     // 구독 아님 아이콘
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';   // 포인트 아이콘

function MyPage() {
  // === 임시 상태 관리 (실제로는 로그인 정보, 백엔드 데이터로 대체) ===
  const [userName, setUserName] = useState('일반 사용자');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [isSubscribed, setIsSubscribed] = useState(true); // 구독 여부 (true: 구독 중, false: 구독 안 함)
  const [points, setPoints] = useState(12500); // 남은 포인트

  const [openDialog, setOpenDialog] = useState(false); // 정보 수정 다이얼로그
  const [tempUserName, setTempUserName] = useState(userName); // 다이얼로그 내 임시 이름
  const [tempUserEmail, setTempUserEmail] = useState(userEmail); // 다이얼로그 내 임시 이메일

  // === 핸들러 함수 ===
  const handleOpenDialog = () => {
    setTempUserName(userName); // 현재 값으로 다이얼로그 초기화
    setTempUserEmail(userEmail);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveInfo = () => {
    // 실제로는 백엔드 API 호출하여 사용자 정보 업데이트 처리
    console.log('사용자 정보 저장 요청:', { name: tempUserName, email: tempUserEmail });
    setUserName(tempUserName);
    setUserEmail(tempUserEmail);
    handleCloseDialog();
    alert('정보가 성공적으로 수정되었습니다.');
  };

  const handleToggleSubscription = () => {
    // 실제로는 백엔드 API 호출하여 구독 상태 변경
    if (isSubscribed) {
      if (window.confirm('정말 구독을 해지하시겠습니까?')) {
        setIsSubscribed(false);
        alert('구독이 해지되었습니다.');
      }
    } else {
      if (window.confirm('구독을 시작하시겠습니까? (결제 페이지로 이동)')) {
        // 실제로는 결제 페이지로 리다이렉트
        setIsSubscribed(true); // 임시로 바로 구독됨으로 설정
        alert('구독이 시작되었습니다!');
      }
    }
  };

  // === 렌더링 ===
  return (
    <Box sx={{ mt: 8, p: 3 }}> {/* AppBar가 있으니 상단 여백을 줍니다 */}
      <Typography variant="h4" gutterBottom>
        마이 페이지
      </Typography>
      <Typography variant="body1" paragraph>
        회원님의 정보와 활동 내역을 확인하고 관리할 수 있습니다.
      </Typography>

      {/* 내 정보 섹션 */}
      <Card sx={{ maxWidth: 600, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            회원 정보
          </Typography>
          <Typography variant="body1">
            <strong>이름:</strong> {userName}
          </Typography>
          <Typography variant="body1">
            <strong>이메일:</strong> {userEmail}
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleOpenDialog}>
            정보 수정
          </Button>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} /> {/* 구분선 */}

      {/* 구독 정보 섹션 */}
      <Card sx={{ maxWidth: 600, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            구독 정보
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              구독 상태:
            </Typography>
            {isSubscribed ? (
              <Chip
                label="구독 중"
                color="success"
                icon={<CheckCircleOutlineIcon />}
                sx={{ fontSize: '0.9rem', height: 'auto', '& .MuiChip-label': { py: 0.5 } }}
              />
            ) : (
              <Chip
                label="구독 안 함"
                color="error"
                icon={<CancelOutlinedIcon />}
                sx={{ fontSize: '0.9rem', height: 'auto', '& .MuiChip-label': { py: 0.5 } }}
              />
            )}
          </Box>
          <Button variant="contained" onClick={handleToggleSubscription}>
            {isSubscribed ? '구독 해지하기' : '구독 시작하기'}
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            {isSubscribed ? '매월 자동 갱신됩니다.' : '다양한 콘텐츠를 무제한으로 즐겨보세요!'}
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} /> {/* 구분선 */}

      {/* 포인트 정보 섹션 */}
      <Card sx={{ maxWidth: 600, mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            내 포인트
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MonetizationOnIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
            <Typography variant="h6" component="span">
              {points.toLocaleString()} 점
            </Typography>
          </Box>
          <Button variant="outlined">포인트 사용 내역</Button>
          <Button variant="text" sx={{ ml: 1 }}>포인트 충전하기</Button> {/* 나중에 추가할 기능 */}
        </CardContent>
      </Card>

      {/* 정보 수정 다이얼로그 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>회원 정보 수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            변경하실 정보를 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="이름"
            type="text"
            fullWidth
            variant="standard"
            value={tempUserName}
            onChange={(e) => setTempUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="이메일"
            type="email"
            fullWidth
            variant="standard"
            value={tempUserEmail}
            onChange={(e) => setTempUserEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleSaveInfo} disabled={!tempUserName || !tempUserEmail}>저장</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyPage;