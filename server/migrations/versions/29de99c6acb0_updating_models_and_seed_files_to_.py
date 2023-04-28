"""updating models and seed files to include a reference table to query

Revision ID: 29de99c6acb0
Revises: 79c3fdb5ce0b
Create Date: 2023-04-28 12:15:36.439401

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29de99c6acb0'
down_revision = '79c3fdb5ce0b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('References',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url', sa.String(), nullable=True))

    with op.batch_alter_table('encounters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url', sa.String(), nullable=True))

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('url')

    with op.batch_alter_table('encounters', schema=None) as batch_op:
        batch_op.drop_column('url')

    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.drop_column('url')

    op.drop_table('References')
    # ### end Alembic commands ###
