# Entity
# - 사용자
# - 이메일 인증번호
# - 게시물
# - 부동산

# Attribute
# - 사용자 (아이디, 비밀번호, 이메일, 권한, 가입경로)
# - 이메일 인증번호 (이메일, 인증번호)
# - 게시물 (접수번호, 상태, 제목, 작성자, 작성일, 조회수, 내용, 답변)
# - 부동산 (번호, 시도, 시군구, 매매 평균, 보증금 평균, 월세 평균, 날짜, 수익률 평균 전체, 수익률 평균 40 초과, 수익률 평균 40 이하, 매매가, 매매가격 대비 전세 비율 전체, 매매가격 대비 전세 비율 40 초과, 매매가격 대비 전세 비율 40 이하, 전세가, 전세가격 대비 월세 보증금 비율 전체, 전세가격 대비 월세 보증금 비율 40 초과, 전세가격 대비 월세 보증금 비율 40 이하)

# Relationship
# 사용자 - 이메일 인증번호 : 이메일 인증번호 테이블에 등록된 이메일만 사용자의 이메일로 사용할 수 있음 (1 : 1)
# 사용자 - 게시물 : 사용자가 게시물을 작성할 수 있음 ( 1 : n )

# 사용자 (아이디, 비밀번호, 이메일, 권한, 가입경로)
# table name : user
# user_id : VARCHAR(50) PK
# user_password : VARCHAR(255) NN 
# user_email : VARCHAR(100) NN UQ FK email_auth_number(email)
# user_role : VARCHAR(15) NN DEFAULT('ROLE_USER') CHECK('ROLE_USER', 'ROLE_ADMIN')
# join_path : VARCHAR(5) NN DEFAULT('HOME') CHECK('HOME', 'KAKAO', 'NAVER')

# 이메일 인증번호 (이메일, 인증번호)
# table name : email_auth_number
# email : VARCHAR(100) PK
# auth_number : VARCHAR(4) NN

# - 게시물 (접수번호, 상태, 제목, 내용, 작성자, 작성일, 조회수, 답변)
# table name : board
# reception_number : INT PK AI
# status : BOOLEAN NN DEFAULT(false)
# title : VARCHAR(100) NN
# contents : TEXT NN
# writer_id : VARCHAR(50) NN FK user(user_id)
# write_datetime : DATETIME NN DEFAULT(now()) 
# view_count : INT NN DEFAULT(0)
# comment : TEXT 