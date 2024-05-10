package com.estate.back.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ChangeDateFormatUtil {
    
    public static String changeYYMMDD(String original) throws Exception {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date datetime = simpleDateFormat.parse(original);
        simpleDateFormat = new SimpleDateFormat("yy.MM.dd");
        String writeDatetime = simpleDateFormat.format(datetime);
        return writeDatetime;
    }

    public static String changeYYYYMMDD(String original) throws Exception {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date datetime = simpleDateFormat.parse(original);
        simpleDateFormat = new SimpleDateFormat("yyyy.MM.dd");
        String writeDatetime = simpleDateFormat.format(datetime);
        return writeDatetime;
    }

    public static String changeYYMM(String original) throws Exception {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date datetime = simpleDateFormat.parse(original);
        simpleDateFormat = new SimpleDateFormat("yy-MM");
        String writeDatetime = simpleDateFormat.format(datetime);
        return writeDatetime;
    }
}
