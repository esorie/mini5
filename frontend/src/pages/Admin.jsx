// frontend/src/pages/Admin.jsx
import React from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Admin() {
  // 예시 사용자 데이터 (나중에 실제 API 연동으로 대체)
  const users = [
    { id: 1, name: '사용자 A', email: 'a@example.com', role: 'user' },
    { id: 2, name: '사용자 B', email: 'b@example.com', role: 'admin' },
    { id: 3, name: '사용자 C', email: 'c@example.com', role: 'user' },
  ];

  const handleEditUser = (userId) => {
    alert(`사용자 ${userId} 수정 기능 (구현 예정)`);
    // 실제 수정 페이지로 이동하거나 모달을 띄우는 로직
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(`사용자 ${userId}를 정말 삭제하시겠습니까?`)) {
      alert(`사용자 ${userId} 삭제 기능 (구현 예정)`);
      // 실제 삭제 API 호출 로직
    }
  };

  return (
    <Box sx={{ mt: 8, p: 3 }}> {/* AppBar가 있으니 상단 여백을 줍니다 */}
      <Typography variant="h4" gutterBottom>
        관리자 페이지
      </Typography>
      <Typography variant="body1" paragraph>
        시스템의 사용자, 도서 등 다양한 콘텐츠를 관리할 수 있습니다.
        <br/>
        <small>(이 페이지는 관리자 권한이 있는 사용자에게만 노출되어야 합니다.)</small>
      </Typography>

      {/* 사용자 목록 섹션 */}
      <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
        사용자 목록
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>권한</TableCell>
              <TableCell align="center">액션</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                    onClick={() => handleEditUser(user.id)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 도서 관리 섹션 */}
      <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
        도서 관리
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained">새 도서 추가</Button>
        <Button variant="outlined">도서 목록 보기</Button>
      </Box>
    </Box>
  );
}

export default Admin;