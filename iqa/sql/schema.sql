-- IQA — Autoavaliação · InnerPlacement
-- MySQL 5.7+ ou MariaDB 10.2+ (pelo tipo JSON). Em versões antigas troque JSON por LONGTEXT.

CREATE TABLE IF NOT EXISTS iqa_respostas (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome           VARCHAR(120)  NOT NULL,
  email          VARCHAR(190)  NOT NULL,
  cargo          VARCHAR(120)  NULL,
  empresa        VARCHAR(120)  NULL,
  evento         VARCHAR(160)  NOT NULL,

  respostas      JSON          NOT NULL COMMENT 'Notas cruas: {"eu":{"1":4,...},"equipe":{...}}',
  resultado      JSON          NOT NULL COMMENT 'Resultado calculado no momento do envio',

  soma_eu        TINYINT UNSIGNED NOT NULL,
  soma_equipe    TINYINT UNSIGNED NOT NULL,
  gap            SMALLINT      NOT NULL,
  faixa_eu       VARCHAR(90)   NOT NULL,
  faixa_equipe   VARCHAR(90)   NOT NULL,

  consentimento  TINYINT(1)    NOT NULL DEFAULT 0,
  email_enviado  TINYINT(1)    NOT NULL DEFAULT 0,
  email_erro     VARCHAR(255)  NULL,

  ip             VARCHAR(45)   NULL,
  user_agent     VARCHAR(255)  NULL,
  criado_em      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  KEY idx_email (email),
  KEY idx_criado (criado_em),
  KEY idx_ip_criado (ip, criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
