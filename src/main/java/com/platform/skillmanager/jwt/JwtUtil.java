package com.platform.skillmanager.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

import io.jsonwebtoken.Claims;

@Component
public class JwtUtil {
    private  final String SECRET = "secretkeyofchagantinehasreenidhi123456";

    private final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email){
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(secretKey)
                .compact();
    }

    public String extractEmail(String token){
        return  Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
