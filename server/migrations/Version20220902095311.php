<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220902095311 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE orders (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', order_number VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, zipcode VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, tracking_url VARCHAR(255) NOT NULL, INDEX IDX_E52FFDEEA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE orders_articles (orders_id INT NOT NULL, articles_id INT NOT NULL, INDEX IDX_78FBECAECFFE9AD6 (orders_id), INDEX IDX_78FBECAE1EBAF6CC (articles_id), PRIMARY KEY(orders_id, articles_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_articles (user_id INT NOT NULL, articles_id INT NOT NULL, INDEX IDX_5F50D568A76ED395 (user_id), INDEX IDX_5F50D5681EBAF6CC (articles_id), PRIMARY KEY(user_id, articles_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE orders ADD CONSTRAINT FK_E52FFDEEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE orders_articles ADD CONSTRAINT FK_78FBECAECFFE9AD6 FOREIGN KEY (orders_id) REFERENCES orders (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE orders_articles ADD CONSTRAINT FK_78FBECAE1EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_articles ADD CONSTRAINT FK_5F50D568A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_articles ADD CONSTRAINT FK_5F50D5681EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE articles_user');
        $this->addSql('ALTER TABLE articles DROP FOREIGN KEY FK_BFDD31681B0176B6');
        $this->addSql('DROP INDEX IDX_BFDD31681B0176B6 ON articles');
        $this->addSql('ALTER TABLE articles DROP user_basket_id');
        $this->addSql('ALTER TABLE comments CHANGE created_at created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE credit_card CHANGE user_id user_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE orders_articles DROP FOREIGN KEY FK_78FBECAECFFE9AD6');
        $this->addSql('CREATE TABLE articles_user (articles_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_D76F110E1EBAF6CC (articles_id), INDEX IDX_D76F110EA76ED395 (user_id), PRIMARY KEY(articles_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE articles_user ADD CONSTRAINT FK_D76F110E1EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE articles_user ADD CONSTRAINT FK_D76F110EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('DROP TABLE orders');
        $this->addSql('DROP TABLE orders_articles');
        $this->addSql('DROP TABLE user_articles');
        $this->addSql('ALTER TABLE articles ADD user_basket_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE articles ADD CONSTRAINT FK_BFDD31681B0176B6 FOREIGN KEY (user_basket_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_BFDD31681B0176B6 ON articles (user_basket_id)');
        $this->addSql('ALTER TABLE comments CHANGE created_at created_at DATE NOT NULL');
        $this->addSql('ALTER TABLE credit_card CHANGE user_id user_id INT NOT NULL');
    }
}
