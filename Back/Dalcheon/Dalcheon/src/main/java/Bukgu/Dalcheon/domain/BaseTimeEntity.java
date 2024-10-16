package Bukgu.Dalcheon.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity{

    // Entity가 생성되어 저장될 때 시간이 자동 저장됩니다.
    @CreatedDate
    @Column(updatable = false) // update 불가
    private LocalDateTime createdDate;

    // 조회한 Entity 값을 변경할 때 시간이 자동 저장됩니다.
//    @LastModifiedDate
//    private LocalDateTime modifiedDate;
}